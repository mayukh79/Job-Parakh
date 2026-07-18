import fitz
from docx import Document


def extract_text(uploaded_file):
    filename = uploaded_file.name.lower()

    if filename.endswith(".txt"):
        return uploaded_file.read().decode("utf-8")

    elif filename.endswith(".pdf"):
        pdf = fitz.open(stream=uploaded_file.read(), filetype="pdf")
        text = ""

        for page in pdf:
            text += page.get_text()

        return text

    elif filename.endswith(".docx"):
        doc = Document(uploaded_file)
        return "\n".join(
            paragraph.text
            for paragraph in doc.paragraphs
        )

    return ""