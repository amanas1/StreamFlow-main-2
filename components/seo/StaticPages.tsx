
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
            ← Back to Radio
        </Link>
        {children}
    </div>
);

export const AboutPage = () => (
    <PageWrapper 
        title="About AU RadioChat – The Future of Internet Radio" 
        description="Learn more about AU RadioChat, a global platform for live radio streaming and community engagement. Discover our mission and technology."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">About AU RadioChat</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200 leading-relaxed font-medium">
                AU RadioChat was born from a simple idea: that radio should be as interactive and accessible as the rest of the modern web.
            </p>
            <p>
                In an era where audio content is fragmented across thousands of apps, we wanted to create a unified <strong>internet radio player</strong> that doesn't 
                require any installation. Our mission is to bridge the gap between traditional broadcasting and the social dynamics of digital communities. 
                With <strong>global radio streaming</strong> built into our core, we allow users to hop from a jazz station in Paris to an electronic underground 
                broadcast in Tokyo within milliseconds.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">Our Technology</h2>
            <p>
                Built on the latest React 19 and Vite architecture, AU RadioChat is designed for speed and reliability. We use <strong>live radio streaming</strong> protocols 
                that optimize bandwidth, ensuring that listeners experience fewer interruptions. Our integrated community chat uses real-time synchronization 
                to allow listeners to participate in a global conversation while listening to their favorite <strong>online radio</strong> stations.
            </p>
            <p>
                We leverage a curated database of over 30,000 stations, categorized by genre, era, and mood. This allows us to offer <strong>free music streaming</strong> 
                that feels personal and high-quality. Our "Magic Curation" feature uses advanced algorithms to suggest stations based on your current vibe 
                and listening history.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">The Global Community</h2>
            <p>
                Sound is a universal language. By providing <strong>global radio stations</strong> to a worldwide audience, we foster cross-cultural understanding. 
                Our users come from every continent, bringing their unique perspectives to our community chat. Whether you are a fan of <strong>jazz radio online</strong> 
                or looking for the latest hip-hop hits, you will find a home here at AU RadioChat.
            </p>
            <p>
                We are committed to keeping this platform free for everyone. Our revenue comes from non-intrusive partnerships, allowing us to focus 
                entirely on the user experience and the quality of the stream.
            </p>
        </div>
    </PageWrapper>
);

export const PrivacyPage = () => (
    <PageWrapper 
        title="Privacy Policy – AU RadioChat" 
        description="Read the AU RadioChat privacy policy. We value your data security and transparency in how we handle your information."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p>
                At AU RadioChat, we take your privacy seriously. This policy outlines how we collect, use, and protect your information when you use our 
                <strong>online radio</strong> streaming platform.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">Data Collection</h2>
            <p>
                We collect minimal data to provide you with the best <strong>internet radio player</strong> experience. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Your preferred language and theme settings (stored locally on your device).</li>
                <li>Your favorite radio stations.</li>
                <li>Public chat messages you send.</li>
                <li>Anonymous usage statistics to improve our <strong>live radio streaming</strong> quality.</li>
            </ul>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">How We Use Information</h2>
            <p>
                Your information is used solely to personalize your experience. We do not sell your personal data to third parties. 
                Our <strong>global radio stations</strong> service uses your IP address only to suggest local stations through geolocation, 
                and this data is not stored permanently.
            </p>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-6">Security</h2>
            <p>
                We use industry-standard encryption to protect your data during transmission. Our <strong>free music streaming</strong> service 
                is designed with security-first principles to ensure your browsing remains private and safe.
            </p>
            <p>
                If you have any questions about our privacy practices, please contact us at <a href="mailto:privacy@auradiochat.com" className="text-primary hover:underline">privacy@auradiochat.com</a>.
            </p>
        </div>
    </PageWrapper>
);

export const ContactPage = () => (
    <PageWrapper 
        title="Contact Us – AU RadioChat Support" 
        description="Get in touch with the AU RadioChat team. We are here to help with station issues, feedback, and partnerships."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Contact Us</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400">
            <p className="text-xl text-slate-200">
                Have questions about our <strong>online radio</strong> platform? We love hearing from our listeners and station partners.
            </p>
            <p>
                Whether you discovered a broken <strong>live radio streaming</strong> link or you want to suggest new <strong>global radio stations</strong> 
                to add to our library, our team is ready to listen.
            </p>
            <div className="grid md:grid-cols-2 gap-10 pt-10">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">General Inquiries</h3>
                    <p className="text-sm">For feedback, general questions, or to just say hello.</p>
                    <a href="mailto:hello@auradiochat.com" className="text-primary font-bold text-lg mt-4 block underline">hello@auradiochat.com</a>
                </div>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Technical Support</h3>
                    <p className="text-sm">Issues with the <strong>internet radio player</strong> or your account.</p>
                    <a href="mailto:support@auradiochat.com" className="text-primary font-bold text-lg mt-4 block underline">support@auradiochat.com</a>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide pt-10">Location</h2>
            <p>
                We are a distributed team working from various parts of the globe, much like the <strong>global radio stations</strong> we host. 
                Our digital headquarters is always open for the community.
            </p>
        </div>
    </PageWrapper>
);

export const GenresPage = () => (
    <PageWrapper 
        title="Radio Genres – Discover Music on AU RadioChat" 
        description="Explore the wide variety of radio genres available on AU RadioChat. From Jazz and Rock to Electronic and Hip-Hop."
    >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Radio Genres</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-slate-400 leading-relaxed">
            <p className="text-xl text-slate-200">
                Music is the heart of what we do. Our <strong>online radio</strong> library spans across every imaginable genre.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                <Link to="/jazz-radio" className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                    <h3 className="text-white font-bold text-xl mb-2">Jazz</h3>
                    <p className="text-xs">Smooth rhythms, classics, and modern soul. <strong>Jazz radio online</strong> at its best.</p>
                </Link>
                <Link to="/rock-radio" className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                    <h3 className="text-white font-bold text-xl mb-2">Rock</h3>
                    <p className="text-xs">From Indie and Alternative to Heavy Metal and Classic Rock.</p>
                </Link>
                <Link to="/electronic-radio" className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                    <h3 className="text-white font-bold text-xl mb-2">Electronic</h3>
                    <p className="text-xs">Techno, House, Ambient, and IDM. Digital sounds for the 21st century.</p>
                </Link>
                <Link to="/hip-hop-radio" className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                    <h3 className="text-white font-bold text-xl mb-2">Hip Hop</h3>
                    <p className="text-xs">Lo-fi beats, underground rap, and global hip-hop culture.</p>
                </Link>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 opacity-50">
                    <h3 className="text-white font-bold text-xl mb-2">World</h3>
                    <p className="text-xs">Traditional music from every continent. Discover <strong>global radio stations</strong>.</p>
                </div>
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5 opacity-50">
                    <h3 className="text-white font-bold text-xl mb-2">Classical</h3>
                    <p className="text-xs">Orchestral masterpieces and chamber music for refined listening.</p>
                </div>
            </div>
            <p className="pt-10">
                Discovering your next favorite track is easy with our <strong>internet radio player</strong>. Browse by genre or 
                use our smart search to find specific sounds. AU RadioChat provides <strong>free music streaming</strong> for all tastes.
            </p>
        </div>
    </PageWrapper>
);
