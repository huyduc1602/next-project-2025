'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function HomePage() {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const features = [
    {
      id: 'feature-1',
      title: 'Blazing Fast Performance',
      description: 'Optimized for speed with React 19 and Next.js 15, delivering lightning-fast experiences.',
      icon: '⚡️',
    },
    {
      id: 'feature-2',
      title: 'Modern Architecture',
      description: 'Built with the latest technologies for scalability, maintainability, and developer experience.',
      icon: '🏗️',
    },
    {
      id: 'feature-3',
      title: 'Responsive Design',
      description: 'Beautiful UI that adapts seamlessly to any device size with Tailwind CSS.',
      icon: '📱',
    },
  ];
  
  const pricingPlans = [
    {
      name: 'Basic',
      price: '$9',
      features: ['Core Features', '10 Projects', 'Basic Support'],
      cta: 'Start Basic',
    },
    {
      name: 'Pro',
      price: '$19',
      features: ['All Basic Features', 'Unlimited Projects', 'Priority Support', 'Advanced Analytics'],
      cta: 'Get Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['All Pro Features', 'Dedicated Account Manager', 'Custom Integrations', 'SLA'],
      cta: 'Contact Sales',
    },
  ];
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Modern React 19 Application
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Blazing fast, beautifully designed, and built with the latest technologies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/get-started"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
              >
                Get Started
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/learn-more"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerful Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need to build modern web applications.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
                onMouseEnter={() => setHovered(feature.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl">
                  {feature.icon}
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  animate={{ y: hovered === feature.id ? 0 : 10, opacity: hovered === feature.id ? 1 : 0 }}
                >
                  <a href={`/features#${feature.id}`} className="inline-flex items-center text-sm font-medium text-primary">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Simple Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that fits your needs
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col rounded-lg border p-6 shadow-sm ${
                  plan.popular ? 'border-primary ring-1 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.price !== 'Custom' && (
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                </div>
                <ul className="my-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={`/pricing/${plan.name.toLowerCase()}`}
                  className={`mt-auto inline-flex h-10 w-full items-center justify-center rounded-md bg-${
                    plan.popular ? 'primary' : 'accent'
                  } px-4 py-2 text-sm font-medium ${
                    plan.popular ? 'text-primary-foreground' : 'text-accent-foreground'
                  } shadow transition-colors hover:bg-${
                    plan.popular ? 'primary/90' : 'accent/90'
                  } focus-visible:outline-none focus-visible:ring-1`}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Join thousands of developers building modern web applications today.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/sign-up"
              className="inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1"
            >
              Sign Up Now
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}