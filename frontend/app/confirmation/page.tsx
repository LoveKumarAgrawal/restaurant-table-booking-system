import React, { Suspense } from 'react';
import ConfirmationPage from '../components/ConfirmationPage';


export default function ConfirmationWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPage />
    </Suspense>
  );
}