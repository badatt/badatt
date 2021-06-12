import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Loadable from '@loadable/component';

import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';
import FormatHtml from 'components/utils/FormatHtml';

import { SectionTitle, ImageSharpFluid } from 'helpers/definitions';

import * as Styled from './styles';

const Carousel = Loadable(() => import('components/ui/Carousel'));

interface Testimonial {
  node: {
    id: string;
    html: string;
    frontmatter: {
      title: string;
      linkedin: string;
      linkedinProfilePhoto: string;
      cover: {
        childImageSharp: {
          fluid: ImageSharpFluid;
        };
      };
    };
  };
}

const Testimonials: React.FC = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "testimonials section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(filter: { frontmatter: { category: { eq: "testimonials" } } }) {
        edges {
          node {
            id
            html
            frontmatter {
              title
              linkedin
              linkedinProfilePhoto
              cover {
                childImageSharp {
                  fluid(maxWidth: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const sectionTitle: SectionTitle = markdownRemark.frontmatter;
  const testimonials: Testimonial[] = allMarkdownRemark.edges;

  return (
    <Container section>
      <TitleSection title={sectionTitle.title} subtitle={sectionTitle.subtitle} center />
      <Styled.Testimonials>
        <Carousel>
          {testimonials.map((item) => {
            const {
              id,
              html,
              frontmatter: { cover, title, linkedin, linkedinProfilePhoto }
            } = item.node;

            return (
              <Styled.Testimonial key={id}>
                <Styled.Image>
                  <a href={linkedin} target="_blank"><img src={linkedinProfilePhoto} alt={title}/></a>
                </Styled.Image>
                <Styled.Title>{title}</Styled.Title>
                <FormatHtml className="p-sm" content={html} />
              </Styled.Testimonial>
            );
          })}
        </Carousel>
      </Styled.Testimonials>
    </Container>
  );
};

export default Testimonials;
