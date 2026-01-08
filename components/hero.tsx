import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const currentWork = [
    {
      title: "IBC Group",
      role: "Web3 Marketing & Growth Manager",
    },
    {
      title: "Coompass",
      role: "Co-Founder",
    },
    {
      title: "Broadpath",
      role: "Partner",
    },
    {
      title: "Builders Camp",
      role: "Founding Mentor",
    },
  ];

  const links = [
    { label: "LinkedIn", href: "https://linkedin.com/in/franlouco" },
    { label: "X (Twitter)", href: "https://x.com/franagl" },
    { label: "Telegram", href: "https://t.me/franlouco" },
  ];

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl flex-1 flex flex-col space-y-12">
        {/* Profile picture and name */}
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Image
              src="/profile.jpg"
              alt="Francisco Lourenço"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Francisco Lourenço
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Product and growth. Building in public. Experiments welcome.
            </p>
            <p className="text-muted-foreground">
              A crossover of product, growth, and tech. Building and shipping ideas.
            </p>
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I build products, test ideas, and document what I learn.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-foreground mb-2">What I do</h3>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Product and growth</li>
                  <li>Web3 when it makes sense</li>
                  <li>Experiments, MVPs, prototypes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Current focus</h3>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Building and iterating in public</li>
                  <li>Mixing tech, marketing, and systems</li>
                  <li>Turning ideas into shipped things</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Current work */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current</h2>
          <div className="space-y-4">
            {currentWork.map((item, index) => (
              <div key={index}>
                <h3 className="font-medium mb-1">{item.role}</h3>
                <p className="text-muted-foreground">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
