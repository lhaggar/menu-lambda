output "lambda_function_name" {
  description = "Terraform-managed Lambda function name."
  value       = aws_lambda_function.send.function_name
}

output "schedule_names" {
  description = "Terraform-managed EventBridge Scheduler schedule names."
  value       = sort([for schedule in aws_scheduler_schedule.menu : schedule.name])
}

output "slack_parameter_names" {
  description = "SecureString parameter names populated outside Terraform."
  value       = local.slack_parameter_names
}
