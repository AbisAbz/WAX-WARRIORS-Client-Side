import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

export default function FooterWithSitemap() {
  return (
    <footer className="relative w-full bg-[#040404eb]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 font-medium text-white"
              >
                {title}
              </Typography>
              {items.map((link) => (
                <Typography
                  key={link}
                  as="a"
                  href="#"
                  color="gray"
                  className="block py-1.5 font-normal transition-colors text-[#eaedf1] hover:text-blue-gray-900"
                >
                  {link}
                </Typography>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-[#e2e8f0] md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Wax Warriors</a>. All
            Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
