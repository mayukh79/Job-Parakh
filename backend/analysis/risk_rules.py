SUSPICIOUS_KEYWORDS = {
    "registration fee": 40,
    "security deposit": 40,
    "training fee": 30,
    "guaranteed job": 25,
    "urgent hiring": 10,
    "immediate joining": 10,
}

SUSPICIOUS_CONTACT_PATTERNS = {
    "whatsapp": 15,
    "telegram": 20,
    "join telegram group": 25,
    "message on whatsapp": 20,
}

FINANCIAL_SCAM_KEYWORDS = [
    "registration fee",
    "security deposit",
    "training fee"
]

PRESSURE_TACTIC_KEYWORDS = [
    "urgent hiring",
    "immediate joining",
    "guaranteed job"
]
RULES = [
    {
        "keyword": "registration fee",
        "weight": 40,
        "category": "financial_scam"
    },
    {
        "keyword": "security deposit",
        "weight": 40,
        "category": "financial_scam"
    },
    {
        "keyword": "training fee",
        "weight": 30,
        "category": "financial_scam"
    },
    {
        "keyword": "urgent hiring",
        "weight": 10,
        "category": "pressure_tactic"
    },
    {
        "keyword": "immediate joining",
        "weight": 10,
        "category": "pressure_tactic"
    },
    {
        "keyword": "guaranteed job",
        "weight": 25,
        "category": "pressure_tactic"
    },
    {
        "keyword": "whatsapp",
        "weight": 15,
        "category": "contact_method"
    },
    {
        "keyword": "telegram",
        "weight": 20,
        "category": "contact_method"
    }
]