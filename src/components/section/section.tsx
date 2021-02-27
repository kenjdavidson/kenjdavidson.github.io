import React, {
  FunctionComponent,
  HTMLAttributes,
  HtmlHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'none' | 'small' | 'medium' | 'large';
  hero?: 'half' | 'full';
  title?: string;
}

const heroSizes = {
  half: '50vh',
  full: '100vh',
};

const paddingSizes = {
  none: '0rem',
  small: '0.5rem',
  medium: '2rem',
  large: '4rem',
};

const StyledSection = styled.section<SectionProps>`
  ${({ hero }) =>
    hero &&
    css`
      min-height: ${heroSizes[hero]};
      display: flex;
      justify-content: flex-start;
      align-items: center;
    `}
  ${({ size }) =>
    size &&
    css`
      padding: ${paddingSizes[size]} 0;
    `}
`;

export const Section: FunctionComponent<SectionProps> = ({ ...rest }) => {
  return <StyledSection {...rest} />;
};

const StyledTitle = styled.h1`<SectionTitleProps>`;

export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const SectionTitle: FunctionComponent<SectionTitleProps> = ({
  className: customizeClassName,
  spacing = 'sm',
  ...props
}) => {
  const wrapperClasses = classNames([
    `section-title`,
    {
      [`spacing-small`]: spacing === 'sm',
      [`spacing-medium`]: spacing === 'md',
      [`spacing-large`]: spacing === 'lg',
    },
    customizeClassName,
  ]);

  return <h2 className={wrapperClasses} {...props} />;
};
