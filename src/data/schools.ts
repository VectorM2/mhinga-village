import type { EducationResource, School } from "@/lib/types";
import { images } from "@/lib/site";
import { localVerified, TO_CONFIRM } from "./verification";

export const schools: School[] = [
  {
    id: "sch-sunduza-primary",
    slug: "sunduza-primary-school",
    name: "Sunduza Primary School",
    type: "primary",
    summary: "Public primary school in Mhinga Zone 3 offering Grade R to Grade 6.",
    description:
      "Sunduza Primary School offers the foundation and intermediate phases, from Grade R to Grade 6. It sits right next to Mhinga Primary School, which takes learners for Grade 7. Both schools are in Mhinga Zone 3, next to Mbhoko shop on the road to Lambani.",
    location: { label: "Mhinga Zone 3 — next to Mbhoko shop, on the road to Lambani" },
    contact: {},
    grades: "Grade R – Grade 6",
    image: images.school,
    verification: localVerified(),
  },
  {
    id: "sch-mhinga-primary",
    slug: "mhinga-primary-school",
    name: "Mhinga Primary School",
    type: "primary",
    summary: "Public primary school in Mhinga Zone 3 offering Grade 7 only.",
    description:
      "Mhinga Primary School offers Grade 7 only. Learners in Grade R to Grade 6 attend Sunduza Primary School right next door. Both schools are in Mhinga Zone 3, next to Mbhoko shop on the road to Lambani.",
    location: { label: "Mhinga Zone 3 — next to Mbhoko shop, on the road to Lambani" },
    contact: {},
    grades: "Grade 7 only",
    image: images.school,
    verification: localVerified(),
  },
  {
    id: "sch-nkhavi-primary",
    slug: "nkhavi-primary-school",
    name: "Nkhavi Primary School",
    type: "primary",
    summary: "Public primary school in Mhinga Zone 2 offering Grade R to Grade 7.",
    description: "Nkhavi Primary School serves families in Mhinga Zone 2 and offers the full primary phase, from Grade R to Grade 7.",
    location: { label: "Mhinga Zone 2" },
    contact: {},
    grades: "Grade R – Grade 7",
    image: images.school,
    verification: localVerified(),
  },
  {
    id: "sch-rhangani-primary",
    slug: "rhangani-primary-school",
    name: "Rhangani Primary School",
    type: "primary",
    summary: "Public primary school in Mhinga Zone 3 offering Grade R to Grade 6.",
    description: "Rhangani Primary School serves families in Mhinga Zone 3 and offers Grade R to Grade 6.",
    location: { label: "Mhinga Zone 3" },
    contact: {},
    grades: "Grade R – Grade 6",
    image: images.school,
    verification: localVerified(),
  },
  {
    id: "sch-ripambeta-secondary",
    slug: "ripambeta-secondary-school",
    name: "Ripambeta Secondary School",
    type: "secondary",
    summary: "Public secondary school in Mhinga Zone 3 offering Grade 8 to Grade 12.",
    description:
      "Ripambeta Secondary School serves learners from Mhinga and surrounding sections, from Grade 8 through to matric (Grade 12).",
    location: { label: "Mhinga Zone 3" },
    contact: {},
    grades: "Grade 8 – Grade 12",
    image: images.school,
    verification: localVerified(),
  },
  {
    id: "sch-special-mhinga",
    slug: "mhinga-special-needs-school",
    name: "Special Needs School (next to Mhinga Clinic)",
    type: "special",
    summary: "Special needs school located next to Mhinga Clinic, beside the main road towards Kruger National Park.",
    description:
      "This school supports learners with special educational needs. Its official name, the support it offers and admission details will be added once confirmed.",
    location: { label: "Next to Mhinga Clinic, beside the main road towards Kruger National Park" },
    contact: {},
    verification: { status: "unverified", source: "Location confirmed by community administrator — school name and details to be confirmed" },
  },
  {
    id: "sch-special-full-service",
    slug: "full-service-schools",
    name: "Full-Service (Inclusive) Schools",
    type: "special",
    summary:
      "Ordinary public schools that are resourced to support learners with moderate learning barriers alongside their peers.",
    description:
      "Under South Africa's inclusive education policy, some ordinary schools are designated as full-service schools. They receive extra support to help learners with moderate barriers to learning. The full-service schools closest to Mhinga will be listed once confirmed with the Vhembe East education district.",
    contact: {},
    verification: TO_CONFIRM,
  },
  {
    id: "sch-special-lsen",
    slug: "special-schools",
    name: "Special Schools (LSEN)",
    type: "special",
    summary:
      "Schools for learners with high support needs, including visual, hearing, physical and intellectual disabilities.",
    description:
      "Special schools provide specialised teaching, therapy and facilities. Placement usually follows an assessment through the SIAS process (Screening, Identification, Assessment and Support) starting at your child's current school or the district office. Special schools serving the Vhembe district will be listed here once confirmed.",
    contact: {},
    verification: TO_CONFIRM,
  },
  {
    id: "sch-ecd",
    slug: "early-childhood-development",
    name: "Early Childhood Development (ECD) Centres",
    type: "early-childhood",
    summary: "Crèches and pre-schools for children before Grade R. Registered ECD centres in Mhinga will be listed here.",
    contact: {},
    verification: TO_CONFIRM,
  },
  {
    id: "sch-vhembe-tvet",
    slug: "vhembe-tvet-college",
    name: "Vhembe TVET College",
    type: "tertiary",
    summary: "Public TVET college with eight campuses in the Vhembe district. The nearest to Mhinga is Shingwedzi Campus in Malamulele.",
    description:
      "Vhembe TVET College offers NC(V) and N1–N6 (Report 191) programmes and occupational qualifications. NSFAS funding is available for qualifying students. Campuses: Shingwedzi (Malamulele), Makwarela (Sibasa/Thohoyandou), Mashamba, Mavhoi (Dzanani), Musina, Thengwe, Tshisimani (Tshakhuma) and the Makhado Hospitality Centre. Check application dates and courses on the college website.",
    location: { label: "Shingwedzi Campus, Malamulele (nearest campus)" },
    contact: { website: "https://www.vhembecollege.edu.za" },
    verification: localVerified("Campuses and website confirmed from public sources", "https://www.vhembecollege.edu.za"),
  },
  {
    id: "sch-univen",
    slug: "university-of-venda",
    name: "University of Venda",
    type: "tertiary",
    summary: "Public university in Thohoyandou — the nearest university to Mhinga.",
    description:
      "Offers undergraduate and postgraduate qualifications. Applications usually open the year before study — confirm dates and requirements on the university website.",
    location: { label: "Thohoyandou" },
    contact: { website: "https://www.univen.ac.za" },
    verification: localVerified("Institution and official website confirmed", "https://www.univen.ac.za"),
  },
];

export const educationResources: EducationResource[] = [
  {
    id: "res-dbe-papers",
    title: "Past exam papers & memos",
    description: "Official NSC past papers and memoranda for Grade 12 revision.",
    url: "https://www.education.gov.za",
    audience: "Grade 10–12 learners",
    provider: "Department of Basic Education",
  },
  {
    id: "res-siyavula",
    title: "Free maths & science textbooks",
    description: "Open textbooks and practice for Grades 4–12 mathematics and physical sciences.",
    url: "https://www.siyavula.com",
    audience: "Learners and teachers",
    provider: "Siyavula",
  },
  {
    id: "res-nsfas",
    title: "NSFAS student funding",
    description: "Funding for qualifying students at public universities and TVET colleges.",
    url: "https://www.nsfas.org.za",
    audience: "School leavers and students",
    provider: "NSFAS",
  },
  {
    id: "res-sias",
    title: "Support for learners with barriers to learning",
    description: "How schools screen, identify and support learners who need extra help (SIAS).",
    url: "https://www.education.gov.za",
    audience: "Parents and caregivers",
    provider: "Department of Basic Education",
  },
];

export const schoolTypeMeta: Record<School["type"], { label: string; plural: string }> = {
  "early-childhood": { label: "Early Childhood", plural: "Early Childhood Development" },
  primary: { label: "Primary", plural: "Primary Schools" },
  secondary: { label: "Secondary", plural: "Secondary Schools" },
  special: { label: "Special Needs", plural: "Special Needs Education" },
  tertiary: { label: "Tertiary", plural: "Tertiary Education" },
};
