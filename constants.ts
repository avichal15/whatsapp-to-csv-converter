// This mapping is derived strictly from the user's provided CSV requirement.
// The keys act as the "Exact Spelling" target for the LLM.
export const SUBJECT_YEAR_MAP: Record<string, string> = {
  "General Anatomy": "First Year",
  "Osteology": "First Year",
  "Anatomy Head and Neck": "First Year",
  "Anatomy NEET Flashcards": "Internship",
  "Dental Anatomy and Oral Histology": "First Year",
  "Dental Anatomy & Oral Histology NEET Flashcards": "Internship",
  "Physiology": "First Year",
  "Physiology NEET Flashcards": "Internship",
  "Biochemistry": "First Year",
  "Biochemistry NEET Flashcards": "Internship",
  "Dental materials": "Second Year",
  "Dental Materials NEET Flashcards": "Internship",
  "Pharmacology": "Second Year",
  "Pharmacology NEET Flashcards": "Internship",
  "General Pathology": "Second Year",
  "General Pathology NEET Flashcards": "Internship",
  "Microbiology": "Second Year",
  "Oral Pathology": "Third Year",
  "Oral Pathology NEET Flashcards": "Internship",
  "General Medicine": "Third Year",
  "General Medicine NEET Flashcards": "Internship",
  "General Surgery": "Third Year",
  "Oral Medicine": "Final Year",
  "Oral Radiology": "Final Year",
  "Oral Radiology NEET Flashcards": "Internship",
  "Public Health Dentistry": "Final Year",
  "Periodontics": "Final Year",
  "Periodontology NEET Flashcards": "Internship",
  "Orthodontics": "Final Year",
  "Orthodontics NEET Flashcards": "Internship",
  "Oral Surgery": "Final Year",
  "Oral Surgery NEET Flashcards": "Internship",
  "Prosthodontics": "Final Year",
  "Prosthodontics NEET Flashcards": "Internship",
  "Conservative Dentistry": "Final Year",
  "Endodontics": "Final Year",
  "Conservative dentistry & Endodontics NEET Flashcards": "Internship",
  "Pedodontics": "Final Year",
  "Pedodontics NEET Flashcards": "Internship"
};

export const COMMON_ABBREVIATIONS = `
Use these hints for fuzzy matching:
- anatomy -> General Anatomy
- Patho -> General Pathology or Oral Pathology (context dependent, usually General if 2nd year)
- omr -> Oral Medicine / Oral Radiology
- conso -> Conservative Dentistry
- Endo -> Endodontics
- Prostho -> Prosthodontics
- DADH -> Dental Anatomy and Oral Histology
- Pharmac -> Pharmacology
`;
