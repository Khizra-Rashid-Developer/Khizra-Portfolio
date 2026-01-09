import { Project, Skill, Certification, Education, Internship } from './types';

export const PERSONAL_INFO = {
  name: "Khizra Rashid",
  role: "Python Developer | AI & Data Science Student",
  about: "I'm Khizra Rashid, a Python developer and an AI & Data Science student, learning to build smart, data-driven applications. I am passionate about leveraging technology to solve real-world problems.",
  email: "rashidkhanhome@gmail.com",
  github: "https://github.com/M-Muneebcoding",
  linkedin: "https://www.linkedin.com/in/khizra-rashid-082787395/",
};

// Augmented with category tags for filtering
export interface EnhancedProject extends Project {
  category: 'Python' | 'AI/Data' | 'Web';
  isComingSoon?: boolean;
}

export const PROJECTS: EnhancedProject[] = [
  {
    title: "Tic-Tac-Toe Game",
    description: "Developed a Tic-Tac-Toe game using Python where the user plays against the computer. The game implements basic game logic to handle player moves, computer moves, and win or draw conditions.",
    link: "https://github.com/M-Muneebcoding/Khizra-Tic-Tac-Toe-Game/tree/main",
    tech: ["Python", "Game Logic", "CLI"],
    category: "Python"
  },
  {
    title: "Next Gen AI Projects",
    description: "Currently researching and developing advanced projects in Machine Learning and Computer Vision. Check back soon for neural networks and predictive models!",
    link: "#",
    tech: ["Python", "TensorFlow", "Pandas"],
    category: "AI/Data",
    isComingSoon: true
  }
];

export const INTERNSHIPS: Internship[] = [
  {
    company: "Hex Software",
    role: "Python Programming Intern",
    domain: "Python Programming",
    imageFileName: "hex1.jpeg"
  },
  {
    company: "Arch Technology",
    role: "Web Development Intern",
    domain: "Web Development",
    imageFileName: "arch1.jpeg"
  }
];

export const SKILLS: Skill[] = [
  // Technical
  { name: "Python Programming", level: 85, category: "Technical" },
  { name: "Artificial Intelligence (AI)", level: 60, category: "Technical", status: "In Progress" },
  { name: "Data Science", level: 60, category: "Technical", status: "In Progress" },
  { name: "Data Analysis", level: 75, category: "Technical" },
  { name: "JavaScript", level: 40, category: "Technical", status: "Basic" },
  { name: "CSS", level: 45, category: "Technical", status: "Basic" },
  { name: "Web Development", level: 50, category: "Technical", status: "Basic" },
  // Tools
  { name: "Google Colab", level: 90, category: "Tools" },
  { name: "Jupyter Notebook", level: 90, category: "Tools" },
  { name: "Kaggle", level: 80, category: "Tools" },
  { name: "VS Code", level: 85, category: "Tools" },
  // Office
  { name: "Microsoft Word", level: 95, category: "Office" },
  { name: "Microsoft PowerPoint", level: 90, category: "Office" },
  { name: "Microsoft Excel", level: 85, category: "Office" },
];

export const EDUCATION: Education[] = [
  {
    institution: "SMIT",
    degree: "AI & Data Science",
    description: "Specialized training in Artificial Intelligence and Data Science.",
  },
  {
    institution: "F.G School",
    degree: "Class 8th",
    description: "Currently studying.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Oracle Foundations Associate", issuer: "Oracle", imageFileName: "ora1.jpeg" },
  { title: "Digital Safety and Security Awareness", issuer: "Cisco", imageFileName: "cisco1.jpeg" },
  { title: "Introduction to Modern AI", issuer: "Cisco", imageFileName: "cisco2.jpeg" },
  { title: "JavaScript Essentials 1", issuer: "Cisco", imageFileName: "cisco3.jpeg" },
  { title: "JavaScript Essentials 2", issuer: "Cisco", imageFileName: "cisco4.jpeg" },
  { title: "Python Essentials 1", issuer: "Cisco", imageFileName: "cisco5.jpeg" },
  { title: "Python Essentials 2", issuer: "Cisco", imageFileName: "cisco6.jpeg" },
  { title: "Data Visualization", issuer: "Kaggle", imageFileName: "kg1.jpeg" },
  { title: "Introduction to Machine Learning", issuer: "Kaggle", imageFileName: "kg2.jpeg" },
  { title: "Introduction to Programming", issuer: "Kaggle", imageFileName: "kg3.jpeg" },
  { title: "Pandas", issuer: "Kaggle", imageFileName: "kg4.jpeg" },
  { title: "Python", issuer: "Kaggle", imageFileName: "kg5.jpeg" },
];