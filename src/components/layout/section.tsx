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
  overrideWidth?: boolean;
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
  position: relative;

  ${({ hero }) =>
    hero &&
    css`
      min-height: ${heroSizes[hero]};
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
  ${({ size }) =>
    css`
      padding-top: ${paddingSizes[size || 'small']};
      padding-bottom: ${paddingSizes[size || 'small']};
    `}
  ${({ overrideWidth, theme }) =>
    !overrideWidth &&
    css`
      padding-left: max(
        1.5rem,
        calc((100vw - ${theme.container.maxWidth}) / 2)
      );
      padding-right: max(
        1.5rem,
        calc((100vw - ${theme.container.maxWidth}) / 2)
      );
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
