from app.services.resume_chat import ask_resume

context = """
Worked with AWS EC2, ECS, ECR, S3.
Implemented CI/CD pipelines in Azure DevOps.
Used Terraform and Docker.
"""

question = "What cloud technologies have I worked with?"

answer = ask_resume(
    question,
    context
)

print("\nANSWER:\n")
print(answer)