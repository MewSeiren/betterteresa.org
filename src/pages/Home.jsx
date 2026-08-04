import React from 'react';
import CivicNav from '@/components/civic/CivicNav';
import Hero from '@/components/civic/Hero';
import Budget from '@/components/civic/Budget';
import Projects from '@/components/civic/Projects';
import Records from '@/components/civic/Records';
import Directory from '@/components/civic/Directory';
import CivicFooter from '@/components/civic/CivicFooter';
import ScrollProgress from '@/components/civic/ScrollProgress';

export default function Home(){return <div className="min-h-screen bg-white text-[#0F2D2E] lg:pl-20"><ScrollProgress/><CivicNav/><main><Hero/><Budget/><Projects/><Records/><Directory/></main><CivicFooter/></div>}