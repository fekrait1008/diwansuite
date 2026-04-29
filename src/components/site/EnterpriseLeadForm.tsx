import { useState, useCallback, useEffect } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { useReveal } from '@/hooks/use-reveal'
import { 
  User, Building2, ClipboardList, Settings2, 
  ArrowRight, ArrowLeft, Check, Loader2, Mail, 
  Phone, Briefcase, Globe, Users, Calendar,
  Cloud, Server, MonitorPlay, Shield, AlertCircle
} from 'lucide-react'

// Form step definitions
const STEPS = ['contact', 'organization', 'requirements', 'preferences'] as const

interface FormData {
  // Step 1: Contact
  fullName: string
  jobTitle: string
  email: string
  phone: string
  
  // Step 2: Organization
  organizationName: string
  sector: string
  country: string
  
  // Step 3: Requirements
  boardCount: string
  memberCount: string
  currentTools: string
  timeline: string
  
  // Step 4: Preferences
  deploymentPreference: 'cloud' | 'on-premise' | 'hybrid' | ''
  demoPreference: 'video-call' | 'in-person' | 'self-guided' | ''
  additionalNotes: string
  
  // Security
  honeypot: string
}

interface EnterpriseLeadFormProps {
  onClose?: () => void
  onSuccess?: () => void
}

// Get reCAPTCHA token
async function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve) => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    if (!siteKey || typeof window === 'undefined' || !(window as any).grecaptcha) {
      resolve('')
      return
    }
    
    ;(window as any).grecaptcha.ready(() => {
      ;(window as any).grecaptcha.execute(siteKey, { action: 'submit_lead' })
        .then(resolve)
        .catch(() => resolve(''))
    })
  })
}

export function EnterpriseLeadForm({ onClose, onSuccess }: EnterpriseLeadFormProps) {
  const { t, font, isRTL, lang } = useLang()
  const ref = useReveal()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    organizationName: '',
    sector: '',
    country: '',
    boardCount: '',
    memberCount: '',
    currentTools: '',
    timeline: '',
    deploymentPreference: '',
    demoPreference: '',
    additionalNotes: '',
    honeypot: '',
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'otp-required'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  // OTP state
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpSending, setOtpSending] = useState(false)
  const [otpCooldown, setOtpCooldown] = useState(0)
  
  // Get translations with type safety
  const formT = t.enterpriseForm ?? {
    steps: { contact: 'Contact', organization: 'Organization', requirements: 'Requirements', preferences: 'Preferences' },
    step1: { title: 'Contact Information' },
    step2: { title: 'Organization Details' },
    step3: { title: 'Your Requirements' },
    step4: { title: 'Your Preferences' },
    fields: {
      fullName: 'Full Name', jobTitle: 'Job Title', email: 'Business Email', phone: 'Phone Number',
      organizationName: 'Organization Name', sector: 'Sector', country: 'Country',
      boardCount: 'Number of Boards/Committees', memberCount: 'Total Members', currentTools: 'Current Tools', timeline: 'Implementation Timeline',
      deploymentPreference: 'Preferred Deployment', demoPreference: 'Demo Preference', additionalNotes: 'Additional Notes',
    },
    placeholders: {
      fullName: 'Enter your full name', jobTitle: 'e.g. Board Secretary', email: 'name@company.com', phone: '+966 5X XXX XXXX',
      organizationName: 'Enter organization name', country: 'e.g. Saudi Arabia',
      currentTools: 'e.g. Excel, Email', additionalNotes: 'Any specific requirements?',
    },
    sectors: { listedCompany: 'Listed Company', government: 'Government', familyBusiness: 'Family Business', financial: 'Financial', healthcare: 'Healthcare', education: 'Education', nonprofit: 'Non-Profit', other: 'Other' },
    timeline: { immediate: 'Immediate', oneToThree: '1-3 months', threeToSix: '3-6 months', sixPlus: '6+ months', exploring: 'Just exploring' },
    deployment: { cloud: 'Cloud (SaaS)', onPremise: 'On-Premise', hybrid: 'Hybrid' },
    demo: { videoCall: 'Video Call', inPerson: 'In-Person', selfGuided: 'Self-Guided' },
    buttons: { next: 'Next', back: 'Back', submit: 'Submit', submitting: 'Submitting...' },
    validation: { required: 'Required', invalidEmail: 'Invalid email', invalidPhone: 'Invalid phone' },
    success: { title: 'Thank you!', message: 'Your request has been received.', close: 'Close' },
    otp: { title: 'Verify Email', message: 'Enter verification code', verify: 'Verify', verifying: 'Verifying...', resend: 'Resend', resendIn: 'Resend in' },
    selectPlaceholder: 'Select...',
    heroCta: { title: 'Start Your Journey', subtitle: 'Get a demo', button: 'Book Demo', buttonExpanded: 'Close' },
  }
  
  // Cooldown timer for OTP
  useEffect(() => {
    if (otpCooldown > 0) {
      const timer = setTimeout(() => setOtpCooldown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [otpCooldown])
  
  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])
  
  // Validate current step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    const requiredMsg = formT.validation?.required || 'This field is required'
    const invalidEmailMsg = formT.validation?.invalidEmail || 'Invalid email address'
    const invalidPhoneMsg = formT.validation?.invalidPhone || 'Invalid phone number'
    
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = requiredMsg
      if (!formData.jobTitle.trim()) newErrors.jobTitle = requiredMsg
      if (!formData.email.trim()) {
        newErrors.email = requiredMsg
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = invalidEmailMsg
      }
      if (!formData.phone.trim()) {
        newErrors.phone = requiredMsg
      } else if (!/^[\d\s+\-()]{8,20}$/.test(formData.phone)) {
        newErrors.phone = invalidPhoneMsg
      }
    }
    
    if (step === 1) {
      if (!formData.organizationName.trim()) newErrors.organizationName = requiredMsg
      if (!formData.sector) newErrors.sector = requiredMsg
      if (!formData.country.trim()) newErrors.country = requiredMsg
    }
    
    if (step === 2) {
      if (!formData.boardCount) newErrors.boardCount = requiredMsg
      if (!formData.memberCount) newErrors.memberCount = requiredMsg
      if (!formData.timeline) newErrors.timeline = requiredMsg
    }
    
    if (step === 3) {
      if (!formData.deploymentPreference) newErrors.deploymentPreference = requiredMsg
      if (!formData.demoPreference) newErrors.demoPreference = requiredMsg
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, formT.validation])
  
  const nextStep = useCallback(() => {
    if (validateStep(currentStep) && currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1)
    }
  }, [currentStep, validateStep])
  
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
    }
  }, [currentStep])
  
  // Send OTP
  const sendOtp = useCallback(async () => {
    if (otpCooldown > 0) return
    
    setOtpSending(true)
    try {
      const response = await fetch('/api/lead-otp-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          locale: lang,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setOtpCooldown(60)
        setShowOtpInput(true)
      } else {
        setErrorMessage(data.message || 'Failed to send verification code')
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.')
    } finally {
      setOtpSending(false)
    }
  }, [formData.email, lang, otpCooldown])
  
  // Verify OTP and submit
  const verifyOtpAndSubmit = useCallback(async () => {
    if (otpCode.length !== 6) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/lead-otp-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          otp: otpCode,
          locale: lang,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setSubmitStatus('success')
        onSuccess?.()
      } else {
        setErrorMessage(data.message || 'Verification failed')
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, otpCode, lang, onSuccess])
  
  // Submit form
  const handleSubmit = useCallback(async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    setErrorMessage('')
    
    try {
      const recaptchaToken = await getRecaptchaToken()
      
      const response = await fetch('/api/lead-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          locale: lang,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        if (data.requiresOtp) {
          setSubmitStatus('otp-required')
          await sendOtp()
        } else if (data.success) {
          setSubmitStatus('success')
          onSuccess?.()
        }
      } else {
        setErrorMessage(data.message || 'Submission failed. Please try again.')
        setSubmitStatus('error')
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }, [currentStep, formData, lang, validateStep, sendOtp, onSuccess])
  
  // Step icons
  const stepIcons = [User, Building2, ClipboardList, Settings2]
  
  // Sector options
  const sectorOptions = [
    { value: 'listed-company', label: formT.sectors?.listedCompany || 'Listed Company' },
    { value: 'government', label: formT.sectors?.government || 'Government Entity' },
    { value: 'family-business', label: formT.sectors?.familyBusiness || 'Family Business' },
    { value: 'financial', label: formT.sectors?.financial || 'Financial Institution' },
    { value: 'healthcare', label: formT.sectors?.healthcare || 'Healthcare' },
    { value: 'education', label: formT.sectors?.education || 'Education' },
    { value: 'nonprofit', label: formT.sectors?.nonprofit || 'Non-Profit' },
    { value: 'other', label: formT.sectors?.other || 'Other' },
  ]
  
  // Board count options
  const boardCountOptions = [
    { value: '1', label: '1' },
    { value: '2-3', label: '2-3' },
    { value: '4-6', label: '4-6' },
    { value: '7-10', label: '7-10' },
    { value: '10+', label: '10+' },
  ]
  
  // Member count options
  const memberCountOptions = [
    { value: '1-10', label: '1-10' },
    { value: '11-25', label: '11-25' },
    { value: '26-50', label: '26-50' },
    { value: '51-100', label: '51-100' },
    { value: '100+', label: '100+' },
  ]
  
  // Timeline options
  const timelineOptions = [
    { value: 'immediate', label: formT.timeline?.immediate || 'Immediate (within 1 month)' },
    { value: '1-3months', label: formT.timeline?.oneToThree || '1-3 months' },
    { value: '3-6months', label: formT.timeline?.threeToSix || '3-6 months' },
    { value: '6months+', label: formT.timeline?.sixPlus || '6+ months' },
    { value: 'exploring', label: formT.timeline?.exploring || 'Just exploring' },
  ]
  
  // Deployment options
  const deploymentOptions = [
    { value: 'cloud', label: formT.deployment?.cloud || 'Cloud (SaaS)', icon: Cloud },
    { value: 'on-premise', label: formT.deployment?.onPremise || 'On-Premise', icon: Server },
    { value: 'hybrid', label: formT.deployment?.hybrid || 'Hybrid', icon: Shield },
  ]
  
  // Demo options
  const demoOptions = [
    { value: 'video-call', label: formT.demo?.videoCall || 'Video Call Demo', icon: MonitorPlay },
    { value: 'in-person', label: formT.demo?.inPerson || 'In-Person Demo', icon: Users },
    { value: 'self-guided', label: formT.demo?.selfGuided || 'Self-Guided Tour', icon: Globe },
  ]
  
  // Input component
  const Input = ({ 
    label, 
    name, 
    type = 'text', 
    icon: Icon, 
    placeholder,
    value,
    onChange,
    error,
    required = true,
  }: {
    label: string
    name: keyof FormData
    type?: string | undefined
    icon: any
    placeholder?: string | undefined
    value: string
    onChange: (value: string) => void
    error?: string | undefined
    required?: boolean | undefined
  }) => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground/80" style={{ fontFamily: font }}>
        <Icon className="h-4 w-4 text-chart-1" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20 ${
          error ? 'border-red-500' : 'border-border'
        }`}
        style={{ fontFamily: font }}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
  
  // Select component
  const Select = ({
    label,
    name,
    icon: Icon,
    options,
    value,
    onChange,
    error,
    required = true,
  }: {
    label: string
    name: keyof FormData
    icon: any
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
    error?: string | undefined
    required?: boolean | undefined
  }) => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground/80" style={{ fontFamily: font }}>
        <Icon className="h-4 w-4 text-chart-1" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20 ${
          error ? 'border-red-500' : 'border-border'
        }`}
        style={{ fontFamily: font }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <option value="">{formT.selectPlaceholder || 'Select...'}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
  
  // Radio card component
  const RadioCard = ({
    options,
    value,
    onChange,
    error,
  }: {
    options: { value: string; label: string; icon: any }[]
    value: string
    onChange: (value: string) => void
    error?: string | undefined
  }) => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map(opt => {
          const Icon = opt.icon
          const isSelected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-start transition-all ${
                isSelected 
                  ? 'border-chart-1 bg-chart-1/5' 
                  : 'border-border hover:border-chart-1/50'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                isSelected ? 'bg-chart-1 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium" style={{ fontFamily: font }}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
  
  // Success screen
  if (submitStatus === 'success') {
    return (
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className="flex flex-col items-center justify-center py-12 text-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground" style={{ fontFamily: font }}>
          {formT.success?.title || 'Thank you!'}
        </h3>
        <p className="mb-6 max-w-md text-muted-foreground" style={{ fontFamily: font }}>
          {formT.success?.message || 'Your request has been received. Our team will contact you within 24 business hours.'}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg bg-chart-1 px-6 py-3 font-medium text-white transition-colors hover:bg-chart-1/90"
            style={{ fontFamily: font }}
          >
            {formT.success?.close || 'Close'}
          </button>
        )}
      </div>
    )
  }
  
  // OTP verification screen
  if (submitStatus === 'otp-required' || showOtpInput) {
    return (
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className="flex flex-col items-center justify-center py-8"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-chart-1/10">
          <Mail className="h-8 w-8 text-chart-1" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground" style={{ fontFamily: font }}>
          {formT.otp?.title || 'Verify your email'}
        </h3>
        <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground" style={{ fontFamily: font }}>
          {formT.otp?.message || `We sent a verification code to ${formData.email}`}
        </p>
        
        <div className="mb-4 w-full max-w-xs">
          <input
            type="text"
            maxLength={6}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full rounded-lg border border-border bg-background px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20"
            dir="ltr"
          />
        </div>
        
        {errorMessage && (
          <p className="mb-4 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </p>
        )}
        
        <button
          onClick={verifyOtpAndSubmit}
          disabled={otpCode.length !== 6 || isSubmitting}
          className="mb-4 w-full max-w-xs rounded-lg bg-chart-1 px-6 py-3 font-medium text-white transition-colors hover:bg-chart-1/90 disabled:opacity-50"
          style={{ fontFamily: font }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {formT.otp?.verifying || 'Verifying...'}
            </span>
          ) : (
            formT.otp?.verify || 'Verify & Submit'
          )}
        </button>
        
        <button
          onClick={sendOtp}
          disabled={otpCooldown > 0 || otpSending}
          className="text-sm text-muted-foreground hover:text-chart-1 disabled:opacity-50"
          style={{ fontFamily: font }}
        >
          {otpCooldown > 0 
            ? `${formT.otp?.resendIn || 'Resend in'} ${otpCooldown}s`
            : formT.otp?.resend || 'Resend code'
          }
        </button>
      </div>
    )
  }
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = stepIcons[index]
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted 
                      ? 'border-chart-1 bg-chart-1 text-white'
                      : isActive 
                        ? 'border-chart-1 bg-chart-1/10 text-chart-1' 
                        : 'border-border bg-background text-muted-foreground'
                  }`}>
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    isActive || isCompleted ? 'text-chart-1' : 'text-muted-foreground'
                  }`} style={{ fontFamily: font }}>
                    {formT.steps?.[step] || step}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 ${
                    index < currentStep ? 'bg-chart-1' : 'bg-border'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Honeypot field - hidden from users, visible to bots */}
      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => updateField('honeypot', e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      {/* Step 1: Contact Information */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: font }}>
            {formT.step1?.title || 'Contact Information'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={formT.fields?.fullName || 'Full Name'}
              name="fullName"
              icon={User}
              placeholder={formT.placeholders?.fullName || 'Enter your full name'}
              value={formData.fullName}
              onChange={(v) => updateField('fullName', v)}
              error={errors.fullName}
            />
            <Input
              label={formT.fields?.jobTitle || 'Job Title'}
              name="jobTitle"
              icon={Briefcase}
              placeholder={formT.placeholders?.jobTitle || 'e.g. Board Secretary'}
              value={formData.jobTitle}
              onChange={(v) => updateField('jobTitle', v)}
              error={errors.jobTitle}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={formT.fields?.email || 'Business Email'}
              name="email"
              type="email"
              icon={Mail}
              placeholder={formT.placeholders?.email || 'name@company.com'}
              value={formData.email}
              onChange={(v) => updateField('email', v)}
              error={errors.email}
            />
            <Input
              label={formT.fields?.phone || 'Phone Number'}
              name="phone"
              type="tel"
              icon={Phone}
              placeholder={formT.placeholders?.phone || '+966 5X XXX XXXX'}
              value={formData.phone}
              onChange={(v) => updateField('phone', v)}
              error={errors.phone}
            />
          </div>
        </div>
      )}
      
      {/* Step 2: Organization */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: font }}>
            {formT.step2?.title || 'Organization Details'}
          </h3>
          <Input
            label={formT.fields?.organizationName || 'Organization Name'}
            name="organizationName"
            icon={Building2}
            placeholder={formT.placeholders?.organizationName || 'Enter organization name'}
            value={formData.organizationName}
            onChange={(v) => updateField('organizationName', v)}
            error={errors.organizationName}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label={formT.fields?.sector || 'Sector'}
              name="sector"
              icon={Briefcase}
              options={sectorOptions}
              value={formData.sector}
              onChange={(v) => updateField('sector', v)}
              error={errors.sector}
            />
            <Input
              label={formT.fields?.country || 'Country'}
              name="country"
              icon={Globe}
              placeholder={formT.placeholders?.country || 'e.g. Saudi Arabia'}
              value={formData.country}
              onChange={(v) => updateField('country', v)}
              error={errors.country}
            />
          </div>
        </div>
      )}
      
      {/* Step 3: Requirements */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: font }}>
            {formT.step3?.title || 'Your Requirements'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label={formT.fields?.boardCount || 'Number of Boards/Committees'}
              name="boardCount"
              icon={ClipboardList}
              options={boardCountOptions}
              value={formData.boardCount}
              onChange={(v) => updateField('boardCount', v)}
              error={errors.boardCount}
            />
            <Select
              label={formT.fields?.memberCount || 'Total Members'}
              name="memberCount"
              icon={Users}
              options={memberCountOptions}
              value={formData.memberCount}
              onChange={(v) => updateField('memberCount', v)}
              error={errors.memberCount}
            />
          </div>
          <Input
            label={formT.fields?.currentTools || 'Current Tools (Optional)'}
            name="currentTools"
            icon={Settings2}
            placeholder={formT.placeholders?.currentTools || 'e.g. Excel, Email, Other software'}
            value={formData.currentTools}
            onChange={(v) => updateField('currentTools', v)}
            required={false}
          />
          <Select
            label={formT.fields?.timeline || 'Implementation Timeline'}
            name="timeline"
            icon={Calendar}
            options={timelineOptions}
            value={formData.timeline}
            onChange={(v) => updateField('timeline', v)}
            error={errors.timeline}
          />
        </div>
      )}
      
      {/* Step 4: Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: font }}>
            {formT.step4?.title || 'Your Preferences'}
          </h3>
          
          <div>
            <label className="mb-3 block text-sm font-medium text-foreground/80" style={{ fontFamily: font }}>
              {formT.fields?.deploymentPreference || 'Preferred Deployment'}
              <span className="text-red-500"> *</span>
            </label>
            <RadioCard
              options={deploymentOptions}
              value={formData.deploymentPreference}
              onChange={(v) => updateField('deploymentPreference', v as any)}
              error={errors.deploymentPreference}
            />
          </div>
          
          <div>
            <label className="mb-3 block text-sm font-medium text-foreground/80" style={{ fontFamily: font }}>
              {formT.fields?.demoPreference || 'Demo Preference'}
              <span className="text-red-500"> *</span>
            </label>
            <RadioCard
              options={demoOptions}
              value={formData.demoPreference}
              onChange={(v) => updateField('demoPreference', v as any)}
              error={errors.demoPreference}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80" style={{ fontFamily: font }}>
              {formT.fields?.additionalNotes || 'Additional Notes (Optional)'}
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => updateField('additionalNotes', e.target.value)}
              placeholder={formT.placeholders?.additionalNotes || 'Any specific requirements or questions?'}
              rows={3}
              maxLength={1000}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-chart-1 focus:outline-none focus:ring-2 focus:ring-chart-1/20"
              style={{ fontFamily: font }}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span style={{ fontFamily: font }}>{errorMessage}</span>
        </div>
      )}
      
      {/* Navigation */}
      <div className={`mt-8 flex items-center ${currentStep === 0 ? 'justify-end' : 'justify-between'}`}>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className={`flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
            style={{ fontFamily: font }}
          >
            {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {formT.buttons?.back || 'Back'}
          </button>
        )}
        
        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className={`flex items-center gap-2 rounded-lg bg-chart-1 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-chart-1/90 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
            style={{ fontFamily: font }}
          >
            {formT.buttons?.next || 'Next'}
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-2 rounded-lg bg-chart-1 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-chart-1/90 disabled:opacity-50 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
            style={{ fontFamily: font }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {formT.buttons?.submitting || 'Submitting...'}
              </>
            ) : (
              <>
                {formT.buttons?.submit || 'Submit Request'}
                <Check className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
