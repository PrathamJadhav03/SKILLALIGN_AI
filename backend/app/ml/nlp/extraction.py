import re

# Mock Dictionary for Prototype
SKILL_DICTIONARY = {
    "PYTHON": ["python", "python3"],
    "SQL": ["sql", "mysql", "postgresql"],
    "POWER_BI": ["power bi", "powerbi", "power-bi"],
    "EXCEL": ["excel", "ms excel", "microsoft excel"],
    "STATISTICS": ["statistics", "stats", "statistical analysis"],
    "MACHINE_LEARNING": ["machine learning", "ml"],
    "JAVASCRIPT": ["javascript", "js", "java script"]
}

def extract_skills(description: str):
    description_lower = description.lower()
    extracted = set()
    
    for normalized, aliases in SKILL_DICTIONARY.items():
        for alias in aliases:
            # Simple word boundary regex
            if re.search(rf'\b{re.escape(alias)}\b', description_lower):
                extracted.add(normalized)
                break # Only need to add normalized once
                
    return list(extracted)

def parse_job_description(description: str):
    skills = extract_skills(description)
    
    # Simple regex for experience extraction
    exp_match = re.search(r'(\d+)\+?\s*years?\s*experience', description.lower())
    experience = int(exp_match.group(1)) if exp_match else 0
    
    return {
        "skills": skills,
        "experience_years": experience
    }
