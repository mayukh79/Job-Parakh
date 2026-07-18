def generate_explanation(reasons, risk_level):
    explanation = [
        f"This job offer has been classified as **{risk_level} Risk**."
    ]

    if any("registration fee" in r.lower() for r in reasons):
        explanation.append(
            "The employer is asking for a registration or processing fee. Genuine companies do not charge candidates during recruitment."
        )

    if any("security deposit" in r.lower() for r in reasons):
        explanation.append(
            "A security deposit before joining is a common scam tactic."
        )

    if any("whatsapp" in r.lower() or "telegram" in r.lower() for r in reasons):
        explanation.append(
            "The recruiter is relying on unofficial communication channels. Legitimate companies usually communicate through official email or company portals."
        )

    if any("urgent" in r.lower() or "immediate" in r.lower() for r in reasons):
        explanation.append(
            "Pressure tactics such as 'urgent hiring' or 'immediate joining' are often used to stop candidates from verifying the opportunity."
        )

    if risk_level == "High":
        explanation.append(
            "Avoid sharing personal documents or making any payment until the employer is independently verified."
        )
    elif risk_level == "Medium":
        explanation.append(
            "Verify the company's website, recruiter email, and job posting before proceeding."
        )
    else:
        explanation.append(
            "Only minor risk indicators were detected, but you should still verify the employer."
        )

    return "\n\n".join(explanation)