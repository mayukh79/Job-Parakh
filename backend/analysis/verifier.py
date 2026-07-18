import re

FREE_EMAILS = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
]

SHORTENERS = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "rb.gy",
]

MESSAGING = [
    "telegram",
    "t.me",
    "whatsapp",
]


def verify_source(text):
    warnings = []

    emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)

    for email in emails:
        domain = email.split("@")[1].lower()

        if domain in FREE_EMAILS:
            warnings.append(
                f"Recruiter is using a free email provider ({domain}) instead of a company domain."
            )

    for shortener in SHORTENERS:
        if shortener in text.lower():
            warnings.append(
                f"URL shortener detected ({shortener}). Destination cannot be verified."
            )

    for app in MESSAGING:
        if app in text.lower():
            warnings.append(
                f"Communication through {app} detected. Verify the recruiter before responding."
            )

    return warnings