import React, { useState, FC } from 'react';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '../../store/useAuthStore';
import { RiLoader3Fill } from 'react-icons/ri';

interface RegisterProps {
  setRegister: (value: boolean) => void;
}

const Register: FC<RegisterProps> = ({ setRegister }) => {
  const { enqueueSnackbar } = useSnackbar();

  // State za formu
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    invitation: "",
    terms: false
  });

  // Handler za polja u formi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const { register, isSigningUp } = useAuthStore();

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      enqueueSnackbar("Full name is required", { variant: "error" });
      return false;
    }
    if (!formData.email.trim()) {
      enqueueSnackbar("Email is required", { variant: "error" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      enqueueSnackbar("Invalid email format", { variant: "error" });
      return false;
    }
    if (!formData.password) {
      enqueueSnackbar("Password is required", { variant: "error" });
      return false;
    }
    if (formData.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    const trimmedName = formData.fullName.trim();
    if (trimmedName.length > 20) {
      enqueueSnackbar("Name must be at most 20 characters long", { variant: "error" });
      return false;
    }
    if (!trimmedName.includes(" ")) {
      enqueueSnackbar("Please enter both first name and last name", { variant: "error" });
      return false;
    }
    if (!formData.terms) {
      enqueueSnackbar("You must agree to the Terms of Service", { variant: "error" });
      return false;
    }
    return true;
  };

  // Handler za submit forme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        invitation: formData.invitation,
        terms: formData.terms
      });
      if (result.success) {
        enqueueSnackbar(result.message, { variant: "success" });
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Polje za ime */}
        <div>
          <label className='block text-gray-50 mt-3 mb-2 text-sm font-medium'>Full Name</label>
          <div className='flex items-center rounded-lg px-4 bg-[#1f1f1f]'>
            <input
              type="text"
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Enter your full name'
              className='bg-transparent flex-1 text-white focus:outline-none py-4'
              required
            />
          </div>
        </div>
        {/* Email polje */}
        <div>
          <label className='block text-gray-50 mt-3 mb-2 text-sm font-medium'>E-mail</label>
          <div className='flex items-center rounded-lg px-4 bg-[#1f1f1f]'>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Please enter your email'
              className='bg-transparent flex-1 text-white focus:outline-none py-4'
              required
            />
          </div>
        </div>

        {/* Password polje */}
        <div>
          <label className='block text-gray-50 mb-2 mt-3 text-sm font-medium'>Password</label>
          <div className='flex items-center rounded-lg px-4 bg-[#1f1f1f]'>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Please enter password'
              className='bg-transparent flex-1 text-white focus:outline-none py-4'
              required
            />
          </div>
        </div>

        {/* Confirm Password polje */}
        <div>
          <label className='block text-gray-50 mb-2 mt-3 text-sm font-medium'>Confirm Password</label>
          <div className='flex items-center rounded-lg px-4 bg-[#1f1f1f]'>
            <input
              type="password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Please enter password'
              className='bg-transparent flex-1 text-white focus:outline-none py-4'
              required
            />
          </div>
        </div>

        {/* Invitation code polje */}
        <div>
          <label className='block text-gray-50 mt-3 mb-2 text-sm font-medium'>Invitation code</label>
          <div className='flex items-center rounded-lg px-4 bg-[#1f1f1f]'>
            <input
              type="text"
              name='invitation'
              value={formData.invitation}
              onChange={handleChange}
              placeholder='Invitation code'
              className='bg-transparent flex-1 text-white focus:outline-none py-4'
            />
          </div>
        </div>



        {/* Terms of Service */}
        <div className='mt-4 flex items-center'>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            id="terms"
            className='mr-2'
            required
          />
          <label htmlFor="terms" className='text-gray-200 text-sm'>
            I have read and agree <a href="#" className='text-yellow-400'>Terms of Service</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 text-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 cursor-pointer"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <div className="flex items-center justify-center">
              <RiLoader3Fill className='animate-spin mr-2' /> REGISTERING...
            </div>
          ) : (
            "REGISTER"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;