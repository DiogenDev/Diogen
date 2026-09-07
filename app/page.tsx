'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsCatalog from '@/components/ProjectsCatalog';
import CredentialsSection from '@/components/CredentialsSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import DiplomaViewerModal from '@/components/DiplomaViewerModal';

export default function Home() {
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#070809] text-zinc-300">
      <Header />
      
      <main className="flex-1">
        <Hero onOpenDiploma={() => setIsDiplomaOpen(true)} />
        <ProjectsCatalog />
        <CredentialsSection onOpenDiploma={() => setIsDiplomaOpen(true)} />
        <ArchitectureSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Two-page Diploma Viewer Modal */}
      <DiplomaViewerModal
        isOpen={isDiplomaOpen}
        onClose={() => setIsDiplomaOpen(false)}
      />
    </div>
  );
}
