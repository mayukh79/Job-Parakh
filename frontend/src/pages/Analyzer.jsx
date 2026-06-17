import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import usePageReveal from '../hooks/usePageReveal';

const signalLabels = ['SOURCE', 'INGEST', 'VERIFY', 'REPORT'];

export default function Analyzer() {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const floatingCardsRef = useRef(null);
    const analyzerCardRef = useRef(null);
    const reportCardRef = useRef(null);
    const scoreMeterRef = useRef(null);
    const [inputText, setInputText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisReport, setAnalysisReport] = useState(null);

    const revealRefs = useMemo(() => [
        eyebrowRef,
        titleRef,
        subtitleRef,
        floatingCardsRef,
        analyzerCardRef,
        reportCardRef,
    ], []);

    usePageReveal(pageRef, revealRefs);

    useLayoutEffect(() => {
        if (!floatingCardsRef.current) return undefined;

        const context = gsap.context(() => {
            gsap.to(floatingCardsRef.current, {
                y: -8,
                delay: 2,
                duration: 2.8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        }, pageRef);

        return () => context.revert();
    }, []);

    useLayoutEffect(() => {
        if (!analysisReport || !scoreMeterRef.current) return undefined;

        const context = gsap.context(() => {
            gsap.fromTo(
                scoreMeterRef.current,
                { scaleX: 0 },
                {
                    scaleX: analysisReport.riskScore / 100,
                    duration: 1,
                    ease: 'power3.out',
                    transformOrigin: 'left center',
                },
            );
        }, reportCardRef);

        return () => context.revert();
    }, [analysisReport]);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setIsAnalyzing(true);
        setAnalysisReport(null);

        // Simulate Job Analysis Engine processing
        setTimeout(() => {
            setIsAnalyzing(false);
            // Determine mock risk level based on keywords
            const lowerText = inputText.toLowerCase();
            let riskScore = 32;
            let indicators = [
                { type: 'low', text: 'Verified communication channel format' },
                { type: 'neutral', text: 'Standard interview flow request' }
            ];
            let riskLevel = 'Low Risk';
            let riskColor = 'monad-risk-low';

            if (lowerText.includes('telegram') || lowerText.includes('whatsapp') || lowerText.includes('payment') || lowerText.includes('fee') || lowerText.includes('deposit') || lowerText.includes('training kit') || lowerText.includes('crypto')) {
                riskScore = 88;
                riskLevel = 'High Risk';
                riskColor = 'monad-risk-high';
                indicators = [
                    { type: 'high', text: 'Requests off-platform communication (Telegram/WhatsApp)' },
                    { type: 'high', text: 'Mentions upfront payment for training, software, or kits' },
                    { type: 'medium', text: 'Vague job description and responsibilities' },
                    { type: 'medium', text: 'Unprofessional or generic domain sender structure' }
                ];
            } else if (lowerText.includes('urgent') || lowerText.includes('immediate start') || lowerText.includes('commission') || lowerText.includes('no experience required')) {
                riskScore = 58;
                riskLevel = 'Moderate Risk';
                riskColor = 'monad-risk-medium';
                indicators = [
                    { type: 'medium', text: 'High pressure urgency cues observed ("Immediate start required")' },
                    { type: 'medium', text: 'Commission-only compensation model with high initial promises' },
                    { type: 'low', text: 'No background information found for recruiter identity' }
                ];
            }

            setAnalysisReport({
                riskScore,
                riskLevel,
                riskColor,
                indicators,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                charCount: inputText.length
            });
        }, 1500);
    };

    const handleReset = () => {
        setInputText('');
        setAnalysisReport(null);
    };

    const renderIndicatorMark = (type) => {
        if (type === 'high') return '!';
        if (type === 'medium') return '?';
        return '+';
    };

    return (
        <div ref={pageRef} className="monad-analyzer">
            <section ref={heroRef} className="monad-hero" aria-labelledby="analyzer-title">
                <div ref={eyebrowRef} className="monad-eyebrow hero-eyebrow">
                    <span />
                    <p>Job Scam Intelligence</p>
                    <span />
                </div>

                <h1 ref={titleRef} id="analyzer-title" className="hero-title">Protect Your Career Before You Apply</h1>
                <p ref={subtitleRef} className="monad-subtitle hero-subtitle">
                    Analyze job descriptions, recruiter messages, and internship offers for scam indicators.
                </p>

                <div ref={floatingCardsRef} className="monad-flow floating-card" aria-hidden="true">
                    <div className="monad-flow-column">
                        <span className="monad-tag">JOB POST</span>
                        <span className="monad-tag">EMAIL OFFER</span>
                        <span className="monad-tag">RECRUITER DM</span>
                    </div>
                    <div className="monad-flow-center">
                        <div className="monad-orbit">
                            <div className="monad-node">CS</div>
                        </div>
                        <div className="monad-status-row">
                            {signalLabels.map((label) => (
                                <span key={label} className="monad-status">
                                    <i />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="monad-flow-column">
                        <span className="monad-tag">RISK SCORE</span>
                        <span className="monad-tag">SIGNALS</span>
                        <span className="monad-tag">NEXT STEP</span>
                    </div>
                </div>
            </section>

            <section className="monad-workspace" aria-label="Job Analysis Engine">
                <div ref={analyzerCardRef} className="monad-card monad-input-card analyzer-card">
                    <div className="monad-card-header">
                        <div>
                            <p className="monad-label">Job Analysis Engine</p>
                            <h2>Paste the offer for review.</h2>
                        </div>
                        <span className="monad-version">v1.2.0-beta</span>
                    </div>

                    <form onSubmit={handleAnalyze} className="monad-form">
                        <label htmlFor="job-content" className="sr-only">Job offer text content</label>
                        <textarea
                            id="job-content"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste a job description, email offer, or message transcript here to scan for risk indicators..."
                            className="monad-textarea"
                            disabled={isAnalyzing}
                        />

                        <div className="monad-actions">
                            <span className="monad-count">{inputText.length} characters</span>
                            <div className="monad-button-row">
                                {analysisReport && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="monad-button monad-button-ghost"
                                    >
                                        Clear
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isAnalyzing || !inputText.trim()}
                                    className="monad-button monad-button-filled"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <span className="monad-spinner" aria-hidden="true" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Offer
                                            <span aria-hidden="true">-&gt;</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div ref={reportCardRef} className="monad-report-wrap report-card">
                    {!analysisReport && !isAnalyzing ? (
                        <div className="monad-card monad-empty-panel">
                            <p className="monad-label">Report Output</p>
                            <h3>No analysis performed yet.</h3>
                            <p>
                                Enter job advertisement or email communication content above. The Job Analysis Engine will extract threat indicators here in real-time.
                            </p>
                        </div>
                    ) : isAnalyzing ? (
                        <div className="monad-card monad-scanning-panel">
                            <div className="monad-scan-ring" aria-hidden="true" />
                            <p className="monad-label">Scanning Payload</p>
                            <h3>Parsing, verifying, and routing signals.</h3>
                            <p>Checking syntax, domains, pressure cues, and known scam patterns.</p>
                        </div>
                    ) : (
                        <div className="monad-card monad-result-panel">
                            <div className="monad-result-header">
                                <div>
                                    <p className="monad-label">Threat Report Summary</p>
                                    <h3>Analysis Output</h3>
                                </div>
                                <div className="monad-verdict">
                                    <span>Verdict</span>
                                    <strong className={analysisReport.riskColor}>
                                        {analysisReport.riskLevel} ({analysisReport.riskScore}%)
                                    </strong>
                                    <div
                                        className="monad-score-meter"
                                        role="meter"
                                        aria-label="Risk score"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        aria-valuenow={analysisReport.riskScore}
                                    >
                                        <span ref={scoreMeterRef} className="monad-score-meter-fill" />
                                    </div>
                                </div>
                            </div>

                            <div className="monad-indicators">
                                <p className="monad-label">Flagged Indicators & Signals</p>
                                {analysisReport.indicators.map((ind, i) => (
                                    <div key={i} className="monad-indicator">
                                        <span className={`monad-indicator-mark monad-indicator-${ind.type}`}>
                                            {renderIndicatorMark(ind.type)}
                                        </span>
                                        <div>
                                            <p>{ind.text}</p>
                                            <small>Source check matches repository DB-2401</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="monad-result-footer">
                                <span>
                                    Scan processed at {analysisReport.timestamp} / {analysisReport.charCount} characters analyzed
                                </span>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="monad-link-button"
                                >
                                    Scan Another Document -&gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
