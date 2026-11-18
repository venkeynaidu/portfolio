import type { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";
import { portfolioData, type ProjectItem, type ExperienceItem } from "@/data/portfolio-data";

/** Maps each project to the 3D industry world that represents its real domain. */
export function getProjectWorld(project: Pick<ProjectItem, "title" | "category">): ProjectWorldKey {
  const { title, category } = project;
  if (title.includes("Chicken") || title.includes("Poultry")) return "poultry";
  if (title.includes("Food") || title.includes("SBL") || title.includes("Beverage")) return "beverage";
  if (title.includes("VCS") || title.includes("PMS") || category.includes("Defense")) return "defence";
  if (title.includes("Servo") || category.includes("Embedded")) return "hardware";
  if (title.includes("Catholica") || category.includes("Community")) return "community";
  return "ecommerce";
}

export function getCompanyKey(companyName: string): CompanyOfficeKey {
  if (companyName.includes("MicroGenesis")) return "microgenesis";
  if (companyName.includes("Tulasi")) return "tulasi";
  return "arowana";
}

export function getCompanyOffice(item: { company: string } | string): CompanyOfficeKey {
  const companyName = typeof item === "string" ? item : item.company;
  return getCompanyKey(companyName);
}

export function getProjectsForWorld(world: ProjectWorldKey): ProjectItem[] {
  return portfolioData.projects.filter((p) => getProjectWorld(p) === world);
}

export function getExperienceForOffice(office: CompanyOfficeKey): ExperienceItem | undefined {
  return portfolioData.experience.find((e) => getCompanyKey(e.company) === office);
}
