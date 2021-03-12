import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Palette } from '../../@types/styled';
import { fontStyle } from '../styles/themes';
import slugify from 'slugify';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from './link';

export interface HeadingProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string;
  accent?: boolean;
  color?: keyof Palette;
  weight?: number | string;
  mx?: 'small' | 'medium' | 'large';
  my?: 'small' | 'medium' | 'large';
}

const colors = (props: HeadingProps) => {
  if (props.accent)
    return css`
      color: ${({ theme }) => theme.primary.accent1};
      text-shadow: 2px 2px 0px ${({ theme }) => theme.primary.accent2};
    `;

  return css`
    color: ${({ theme }) => theme.primary[props.color || 'heading']};
  `;
};

const margins = {
  none: '0em',
  small: '0.5em',
  medium: '1em',
  large: '1.5em',
};

const HeadingBase: FunctionComponent<HeadingProps> = ({
  level = 1,
  ...rest
}) => {
  const Heading = `h${level}`;
  return <Heading {...rest} />;
};

export const Heading = styled(HeadingBase)`
  ${colors}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ mx }) =>
    `margin-left: ${margins[mx || 'none']}; margin-right:${
      margins[mx || 'none']
    };`}
    ${({ my }) =>
    `margin-top: ${margins[my || 'none']}; margin-bottom:${
      margins[my || 'none']
    };`}
`;

export const PageHeading = styled(Heading)`
  ${fontStyle(3.583, 4.768, 'heading')}
  position: relative;
  font-weight: 600;

  &::before,
  &&::after {
    content: attr(data-title);
    position: absolute;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.primary.accent1};
    z-index: -1;
  }

  &::before {
    top: 1px;
    left: 1px;
  }

  &::after {
    top: -1px;
    left: -1px;
  }
`;

const BaseLinkHeading = styled(Heading)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > a {
    font-size: 0.8em;
    margin-left: 0.5em;
    display: none;
  }

  &:hover > a {
    display: block;
  }
`;

export const LinkHeading: FunctionComponent<HeadingProps> = ({
  level = 1,
  children,
  ...rest
}) => {
  const value =
    children != null && typeof children == 'object'
      ? children.join(' ')
      : children;
  const link = slugify(value).toLowerCase();
  return (
    <BaseLinkHeading level={level} id={link} {...rest}>
      {children}
      {level < 4 && (
        <Link to={`#${link}`} decoration="none">
          <LinkOutlined />
        </Link>
      )}
    </BaseLinkHeading>
  );
};
