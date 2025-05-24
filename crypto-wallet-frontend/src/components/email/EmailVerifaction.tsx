import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Shield, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';

export const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  const {
    authUser,
    isSendingVerification,
    isVerifyingEmail,
    verificationStatus,
    isLoadingVerificationStatus,
    sendVerificationCode,
    verifyEmail,
    getVerificationStatus
  } = useAuthStore();

  // Get verification status on component mount
  useEffect(() => {
    getVerificationStatus();
  }, [getVerificationStatus]);

  // Countdown timer for active verification code
  useEffect(() => {
    if (verificationStatus?.hasActiveCode && verificationStatus?.codeExpiresAt) {
      const expiresAt = new Date(verificationStatus.codeExpiresAt).getTime();
      
      const timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
        
        setCountdown(timeLeft);
        
        if (timeLeft === 0) {
          clearInterval(timer);
          getVerificationStatus(); // Refresh status when expired
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [verificationStatus?.hasActiveCode, verificationStatus?.codeExpiresAt, getVerificationStatus]);

  // Handle sending verification code
  const handleSendCode = async () => {
    const result = await sendVerificationCode();
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    });
    
    if (result.success) {
      setVerificationCode('');
    }
  };

  // Handle email verification
  const handleVerifyEmail = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    
    if (!verificationCode.trim()) {
      setMessage({ type: 'error', text: 'Please enter the verification code' });
      return;
    }

    const result = await verifyEmail(verificationCode.trim());
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    });
    
    if (result.success) {
      setVerificationCode('');
    }
  };

  // Format countdown display
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show loading state
  if (isLoadingVerificationStatus) {
    return (
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="text-gray-300">Loading verification status...</span>
        </div>
      </div>
    );
  }

  // Show if email is already verified
  if (verificationStatus?.isEmailVerified) {
    return (
      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <div>
            <h3 className="text-lg font-semibold text-green-400">Email Verified</h3>
            <p className="text-gray-300">Your email address has been successfully verified!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-orange-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Email Verification Required</h3>
            <p className="text-gray-300">Please verify your email address to secure your account</p>
          </div>
        </div>

        {/* Email info */}
        <div className="flex items-center space-x-2 text-gray-400">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{authUser?.email}</span>
        </div>

        {/* Message display */}
        {message.text && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/30 border border-green-500/30 text-green-300' 
              : 'bg-red-900/30 border border-red-500/30 text-red-300'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Send verification code section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Send verification code to your email</span>
            {verificationStatus?.hasActiveCode && countdown > 0 && (
              <div className="flex items-center space-x-2 text-blue-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{formatCountdown(countdown)}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSendCode}
            disabled={isSendingVerification || (verificationStatus?.hasActiveCode && countdown > 0)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isSendingVerification ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : verificationStatus?.hasActiveCode && countdown > 0 ? (
              <span>Code sent - wait {formatCountdown(countdown)}</span>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Send Verification Code</span>
              </>
            )}
          </button>
        </div>

        {/* Verification form */}
        {verificationStatus?.hasActiveCode && (
          <div className="space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300 mb-2">
                Enter 6-digit verification code
              </label>
              <input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  // Only allow numbers and max 6 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && verificationCode.length === 6) {
                    handleVerifyEmail(e);
                  }
                }}
                placeholder="123456"
                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none font-mono text-center text-xl tracking-widest"
                maxLength={6}
              />
            </div>
            
            <button
              onClick={handleVerifyEmail}
              disabled={isVerifyingEmail || verificationCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isVerifyingEmail ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Email</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Help text */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Check your spam/junk folder if you don't see the email</p>
          <p>• The verification code expires in 2 minutes</p>
          <p>• You can request a new code if the current one expires</p>
        </div>
      </div>
    </div>
  );
};