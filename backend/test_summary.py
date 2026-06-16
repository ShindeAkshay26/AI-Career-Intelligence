from app.services.resume_summary import generate_summary

text = """
Cloud Engineer with experience in AWS, Azure,
Docker, Kubernetes and Terraform.
"""

summary = generate_summary(text)

print(summary)