// NavigationService.js
import React from 'react';

export const navigationRef = React.createRef();

// Navigate 함수 정의
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

