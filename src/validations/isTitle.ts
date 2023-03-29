import validator from "validator";
import { BadRequestException } from "../exceptions/http.exceptions.js";


const titles = [
    "Developer",
    "Software Engineer",
    "HR",
    "CEO",
    "CTO",
    "Team Lead",
    "Director",
    "Architect",
    "Tech Lead",
    "Financial Accountant",
    "Marketing",
    "IT Specialist"
]

export const isTitleValid = (title: string) => {
    try {
        const isValid = validator.isIn(title, titles)
    
        if (!isValid) throw new BadRequestException("Invalid field");
        return true;
      } catch(err) {
        throw new BadRequestException("Invalid field")
      }
}
