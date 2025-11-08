"use client";

import React from 'react';
import { Crown, Check, Zap, Shield, Gift, Star } from 'lucide-react';

export default function PremiumPage() {
  const plans = [
    {
      name: "Basic",
      price: 0,
      period: "Free Forever",
      description: "Perfect for occasional travelers",
      features: [
        "Basic AI recommendations",
        "3 itineraries per month",
        "Community access",
        "Email support",
        "Standard booking fees"
      ],
      limited: ["Advanced AI features", "Priority support", "Premium destinations", "Exclusive deals"],
      highlight: false
    },
    {
      name: "Premium",
      price: 99000,
      period: "per month",
      description: "Best for frequent travelers",
      features: [
        "Advanced AI recommendations",
        "Unlimited itineraries",
        "Priority customer support 24/7",
        "Zero booking fees",
        "Exclusive travel deals",
        "Early access to new features",
        "Premium destination guides",
        "Travel insurance discount",
        "Airport lounge access",
        "Community badge"
      ],
      limited: [],
      highlight: true
    },
    {
      name: "Business",
      price: 499000,
      period: "per month",
      description: "For travel agencies & tour operators",
      features: [
        "Everything in Premium",
        "White-label solution",
        "API access",
        "Custom branding",
        "Dedicated account manager",
        "Analytics dashboard",
        "Multi-user accounts (up to 10)",
        "Bulk booking discounts",
        "Custom integrations",
        "Priority onboarding"
      ],
      limited: [],
      highlight: false
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Priority AI Processing",
      description: "Get your personalized recommendations in seconds, not minutes"
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Complimentary travel insurance for all bookings worth up to $50,000"
    },
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Access to VIP lounges, hotel upgrades, and special experiences"
    },
    {
      icon: Star,
      title: "Zero Booking Fees",
      description: "Save up to 15% on booking fees for hotels, flights, and activities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Crown className="w-16 h-16 mx-auto mb-4 text-amber-500" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock advanced AI features, exclusive deals, and premium travel experiences
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-xl border-2 ${
                plan.highlight 
                  ? 'border-amber-400 relative transform scale-105' 
                  : 'border-green-100'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  Most Popular ⭐
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-2">
                  {plan.price === 0 ? (
                    <span className="text-5xl font-bold text-gray-900">Free</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold text-gray-900">
                        Rp {plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-lg">/{plan.period}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.limited.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <p className="text-sm font-semibold text-gray-500 mb-3">Not included:</p>
                    </div>
                    {plan.limited.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-400 line-through">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-2xl'
                    : plan.price === 0
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg'
                }`}
              >
                {plan.price === 0 ? 'Current Plan' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel your subscription anytime. You'll continue to have access until the end of your billing period."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and bank transfers. All payments are processed securely."
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Premium plan comes with a 14-day free trial. No credit card required to start."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our premium service."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Travel Experience?</h2>
          <p className="text-xl mb-8 opacity-90">Join 50,000+ premium travelers worldwide</p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}