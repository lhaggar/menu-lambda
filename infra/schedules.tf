locals {
  schedules = {
    presend-morning = {
      expression  = "cron(30 6 ? * MON-FRI *)"
      destination = "presend"
    }
    presend-morning-2 = {
      expression  = "cron(15 8 ? * MON-FRI *)"
      destination = "presend"
    }
    send-morning = {
      expression  = "cron(30 8 ? * MON-FRI *)"
      destination = "main"
    }
  }
}

data "aws_iam_policy_document" "scheduler_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["scheduler.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "scheduler" {
  name               = "${var.service_name}-${var.environment}-scheduler"
  assume_role_policy = data.aws_iam_policy_document.scheduler_assume_role.json
}

data "aws_iam_policy_document" "scheduler" {
  statement {
    actions   = ["lambda:InvokeFunction"]
    resources = [aws_lambda_function.send.arn]
  }
}

resource "aws_iam_role_policy" "scheduler" {
  name   = "${var.service_name}-${var.environment}-invoke-lambda"
  role   = aws_iam_role.scheduler.id
  policy = data.aws_iam_policy_document.scheduler.json
}

resource "aws_scheduler_schedule" "menu" {
  for_each = local.schedules

  name                         = "${var.service_name}-${var.environment}-${each.key}"
  description                  = "Invoke menu-lambda for ${each.value.destination} destination"
  schedule_expression          = each.value.expression
  schedule_expression_timezone = "Europe/London"
  state                        = var.schedules_enabled ? "ENABLED" : "DISABLED"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = aws_lambda_function.send.arn
    role_arn = aws_iam_role.scheduler.arn
    input    = jsonencode({ destination = each.value.destination })

    retry_policy {
      maximum_event_age_in_seconds = 3600
      maximum_retry_attempts       = 2
    }
  }
}
