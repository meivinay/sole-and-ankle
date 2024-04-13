import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
        {
          variant !== 'default' ? (
          <Variant accent={typeof salePrice === 'number' ? COLORS.primary : COLORS.secondary}>
            {variant === 'on-sale' ? 'Sale' : 'Just Released' }
          </Variant>
          ) : null
        }
      </Wrapper>
    </Link>
  );
};

const Variant = styled.div`
padding: 7px 9px 9px 10px;
font-size: 14px;
font-weight: 700;
line-height: 16.44px;
position: absolute;
top: 12px;
text-transform: capitalize;
right: -14px;
background-color: ${props => props.accent};
color: ${COLORS.white}
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article` position: relative;`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`height: 312px; width: 340px; border-radius: 16px 16px 4px 4px;`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
