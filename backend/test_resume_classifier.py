from app.services.resume_classifier import (
    predict_category
)

text = """
Python AWS Azure Docker Terraform Kubernetes
"""

print(
    predict_category(text)
)