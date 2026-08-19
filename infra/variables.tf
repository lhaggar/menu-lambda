variable "aws_region" {
  description = "AWS region containing menu-lambda resources."
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "production"
}

variable "lambda_zip_path" {
  description = "Path to production Lambda ZIP artifact."
  type        = string
  default     = "../build/menu-lambda.zip"
}

variable "log_retention_days" {
  description = "CloudWatch log retention period."
  type        = number
  default     = 30
}

variable "schedules_enabled" {
  description = "Enable Terraform-managed schedules after migration cutover."
  type        = bool
  default     = false
}

variable "service_name" {
  description = "Stable application name used in AWS resource names."
  type        = string
  default     = "menu-lambda"
}
