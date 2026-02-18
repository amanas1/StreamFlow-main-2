
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PageWrapper: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="py-20 px-6 md:px-20 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-700">
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
        <Link to="/" className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest mb-10 hover:translate-x-[-4px] transition-transform">
            ← Back to Player
        </Link>
        {children}
    </div>
);

export const JazzRadioPage = () => (
    <PageWrapper 
        title="Listen to Jazz Radio Online – AU RadioChat" 
        description="Stream the best jazz radio online. From smooth jazz to avant-garde, explore global jazz stations on our free internet radio player."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Jazz Radio Online</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200">
                Immerse yourself in the syncopated rhythms and soulful melodies of <strong>jazz radio online</strong>. 
                AU RadioChat brings you a curated list of the world's finest jazz broadcasts.
            </p>
            <p>
                Jazz is more than just a genre; it's a conversation. On our <strong>internet radio player</strong>, you can experience this dialogue 
                in real-time. From the legendary stations in New Orleans to the contemporary electronic jazz movements in London and Berlin, 
                our platform connects you to the heartbeat of the jazz world. 
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">The Legacy of Jazz Streaming</h2>
            <p>
                Our <strong>live radio streaming</strong> technology ensures that every saxophone solo and subtle brush-on-snare detail 
                is captured with crystal clarity. We support high-fidelity streams from <strong>global radio stations</strong> dedicated 
                to preserving the history of jazz while pushing its boundaries.
            </p>
            <p>
                Whether you prefer the swing era, bebop, cool jazz, or fusion, you can find it here. Our <strong>online radio</strong> 
                interface makes it easy to switch between moods—choose "Smooth" for a relaxing evening or "Avant-Garde" for a 
                challenging, intellectual listening session.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">Why AU RadioChat for Jazz?</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Installation:</strong> Listen directly in your browser.</li>
                <li><strong>Global Access:</strong> Stations from NYC, Tokyo, Paris, and more.</li>
                <li><strong>Community:</strong> Chat with other jazz enthusiasts while the music plays.</li>
                <li><strong>Free Streaming:</strong> High-quality audio without the subscription tag.</li>
            </ul>
            <p className="pt-6">
                Join the AU RadioChat community today and discover why we are the preferred <strong>internet radio player</strong> for jazz fans 
                worldwide. Start listening to <strong>jazz radio online</strong> and let the music take you on a journey.
            </p>
        </div>
    </PageWrapper>
);

export const RockRadioPage = () => (
    <PageWrapper 
        title="Best Rock Radio Online – AU RadioChat" 
        description="Listen to Rock radio online. Classic rock, alternative, indie, and metal stations from across the globe on AU RadioChat."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Listen to Rock Radio</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200">
                Plug in and turn it up. Experience the raw energy of <strong>rock radio online</strong> through our 
                seamless <strong>live radio streaming</strong> platform.
            </p>
            <p>
                From the distorted riffs of 70s hard rock to the intricate melodies of modern indie, our <strong>internet radio player</strong> 
                hosts thousands of <strong>global radio stations</strong> that live and breathe rock and roll. Whether you're a fan 
                of stadium classics or you're searching for the next big thing in the underground scene, AU RadioChat has the station for you.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">Every Subgenre Imagineable</h2>
            <p>
                Rock is a vast landscape. Our <strong>online radio</strong> categorization helps you navigate:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Classic Rock:</strong> The legends who defined the genre.</li>
                <li><strong>Alternative & Indie:</strong> New sounds and experimental structures.</li>
                <li><strong>Punk & Grunge:</strong> High energy and raw emotion.</li>
                <li><strong>Heavy Metal:</strong> The loudest and fastest stations on the planet.</li>
            </ul>
            <p>
                We prioritize low-latency <strong>free music streaming</strong> so you never miss a beat of those epic guitar solos. 
                Our community chat is filled with rockers sharing their favorite new finds and discussing legendary concerts.
            </p>
            <p>
                Experience the best <strong>rock radio online</strong> today. No apps to download, no barriers—just pure rock.
            </p>
        </div>
    </PageWrapper>
);

export const ElectronicRadioPage = () => (
    <PageWrapper 
        title="Electronic Music Radio – AU RadioChat" 
        description="Stream electronic music radio live. Techno, House, Ambient, and EDM stations from the world's best clubs and studios."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Electronic Soundscapes</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200">
                The sound of the future is here. Explore the diverse world of <strong>electronic music radio</strong> on AU RadioChat.
            </p>
            <p>
                Electronic music is defined by its evolution. Our <strong>internet radio player</strong> connects you to <strong>global radio stations</strong> 
                broadcasting from the world's electronic music hubs—Berlin, London, Ibiza, and Detroit. 
                Whether you need a driving techno beat for an intense workout or a lush ambient soundscape for focus, 
                our <strong>live radio streaming</strong> delivers it instantly.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">From Underground to Mainstage</h2>
            <p>
                Our <strong>online radio</strong> library is deep. Discover:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Techno & House:</strong> The foundation of modern dance music.</li>
                <li><strong>Synthwave & IDM:</strong> Complex rhythms for the digital age.</li>
                <li><strong>Ambient & Chill:</strong> Atmospheric textures for relaxation.</li>
                <li><strong>EDM & Trance:</strong> Energetic anthems from the biggest festivals.</li>
            </ul>
            <p>
                As a lightweight <strong>internet radio player</strong>, we ensure that the complex frequencies of electronic music 
                are delivered with the depth they deserve. Join our community of producers and fans in the chat 
                to discuss gear, software, and the latest releases.
            </p>
            <p>
                Experience <strong>free music streaming</strong> for the electronic generation on AU RadioChat.
            </p>
        </div>
    </PageWrapper>
);

export const HipHopRadioPage = () => (
    <PageWrapper 
        title="Hip Hop Radio Online – AU RadioChat" 
        description="Listen to Hip Hop radio online. Stream lo-fi, underground rap, and classic hip-hop hits from global stations."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Hip Hop Culture Live</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200">
                More than music, it's a movement. Stream the best <strong>hip hop radio online</strong> with AU RadioChat.
            </p>
            <p>
                From the golden era boom-bap to the modern trap sound, our <strong>internet radio player</strong> is your 
                gateway to global hip-hop culture. We host <strong>global radio stations</strong> that represent the roots 
                and the evolution of the genre.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">The Global Flow</h2>
            <p>
                Hip-hop has no borders. Discover:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Lo-Fi & Study Beats:</strong> The perfect backdrop for productivity.</li>
                <li><strong>Boom Bap:</strong> The classic NYC sound.</li>
                <li><strong>Trap & Drill:</strong> The modern energy from Atlanta, Chicago, and London.</li>
                <li><strong>Underground Rap:</strong> Independent artists and local scenes worldwide.</li>
            </ul>
            <p>
                Our <strong>online radio</strong> platform allows you to discover how different cultures have adapted the 
                language of hip-hop. Use our <strong>live radio streaming</strong> to explore the rap scenes in 
                Kazakhstan, France, South Korea, and beyond.
            </p>
            <p>
                Join the cipher in our community chat. AU RadioChat is the ultimate <strong>internet radio player</strong> 
                for true hip-hop heads. Enjoy <strong>free music streaming</strong> dedicated to the culture.
            </p>
        </div>
    </PageWrapper>
);
