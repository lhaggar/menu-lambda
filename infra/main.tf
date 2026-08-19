data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}

locals {
  function_name = "${var.service_name}-${var.environment}-send-v2"

  slack_parameter_names = {
    main    = "/${var.service_name}/${var.environment}/slack/main"
    presend = "/${var.service_name}/${var.environment}/slack/presend"
  }

  slack_parameter_arns = {
    for key, name in local.slack_parameter_names :
    key => "arn:${data.aws_partition.current.partition}:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter${name}"
  }
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${local.function_name}-runtime"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "lambda" {
  statement {
    sid = "WriteFunctionLogs"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["${aws_cloudwatch_log_group.lambda.arn}:*"]
  }

  statement {
    sid       = "ReadSlackWebhooks"
    actions   = ["ssm:GetParameter"]
    resources = values(local.slack_parameter_arns)
  }
}

resource "aws_iam_role_policy" "lambda" {
  name   = "${local.function_name}-runtime"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda.json
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = var.log_retention_days
}

resource "aws_lambda_function" "send" {
  function_name = local.function_name
  description   = "Posts daily canteen menu to Slack"
  filename      = var.lambda_zip_path
  handler       = "handler.run"
  runtime       = "nodejs22.x"
  architectures = ["arm64"]
  memory_size   = 128
  timeout       = 15
  role          = aws_iam_role.lambda.arn

  source_code_hash = filebase64sha256(var.lambda_zip_path)

  environment {
    variables = {
      SLACK_MAIN_PARAMETER_NAME    = local.slack_parameter_names["main"]
      SLACK_PRESEND_PARAMETER_NAME = local.slack_parameter_names["presend"]
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.lambda,
    aws_iam_role_policy.lambda,
  ]
}
