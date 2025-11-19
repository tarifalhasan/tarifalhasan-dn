import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Tarif delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise is outstanding.",
      name: "Sarah Johnson",
      designation: "CTO · TechStart Inc.",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    },
    {
      quote:
        "Working with Tarif was a game-changer for our product launch. He transformed complex requirements into an elegant, scalable solution in just weeks.",
      name: "Michael Chen",
      designation: "Product Manager · InnovateCorp",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "Our healthcare management system is robust, secure, and user-friendly. Tarif guided us through compliance, DevOps, and design with ease.",
      name: "Emily Rodriguez",
      designation: "Founder · HealthTech Solutions",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "He automated our crypto analytics workflow with realtime dashboards and AI agents. The performance uplift was immediate.",
      name: "James Kim",
      designation: "Engineering Lead · DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
    },
    {
      quote:
        "From strategy to deployment, Tarif felt like an embedded team member. Our operations are 4× faster thanks to his DevOps playbook.",
      name: "Lisa Thompson",
      designation: "VP Technology · FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
