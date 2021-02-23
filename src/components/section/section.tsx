import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import styled from 'styled-components';

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  verticalPad?: 'md' | 'sm';
  size?: 'hero' | undefined;
  title?: string;
}

export const Section: FunctionComponent<SectionProps> = ({
  children,
  className: customizeClassName,
  verticalPad,
  size,
  title: titleProp,
  ...rest
}) => {
  const wrapperClasses = classNames([
    `content-section`,
    {
      [`hero`]: size === 'hero',
      [`v-pad-small`]: verticalPad === 'sm',
      [`v-pad-medium`]: verticalPad === 'md',
    },
    customizeClassName,
  ]);

  return (
    <section className={wrapperClasses} {...rest}>
      {children}
    </section>
  );
};

const StyledTitle = styled(Typography.Title)<SectionTitleProps>``;

export interface SectionTitleProps extends TitleProps {
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

  return <Typography.Title className={wrapperClasses} level={2} {...props} />;
};
