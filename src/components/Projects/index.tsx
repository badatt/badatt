import React from 'react';
import _ from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import momnent from 'moment';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';

import { SectionTitle, ImageSharpFluid } from 'helpers/definitions';

import './style.css';

interface Project {
  node: {
    id: string;
    frontmatter: {
      title: string;
      category: string;
      projectType: string;
      details: string;
      publishedAt: string;
      duration: number;
      tech: string;
      link: string;
      cover: {
        childImageSharp: {
          fluid: ImageSharpFluid;
        };
      };
    };
  };
}

const Projects: React.FC = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo();
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "projects section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(filter: { frontmatter: { category: { eq: "projects" } } }, sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            frontmatter {
              projectType
              title
              details
              publishedAt
              duration
              tech
              link
              cover {
                childImageSharp {
                  fluid(maxWidth: 320) {
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
  const projects: Project[] = allMarkdownRemark.edges;
  const { clone } = _.groupBy(projects, 'node.frontmatter.projectType');

  return (
    <Container section>
      <TitleSection title={sectionTitle.title} subtitle={sectionTitle.subtitle} center />
      <div className="w-full">
        <h3 className="project-type uppercase mb-4 text-sm font-bold w-full text-left">Clones</h3>
        <div className="flex flex-wrap">
          {clone.map((item) => {
            const {
              id,
              frontmatter: { title, details, publishedAt, duration, tech, link, cover },
            } = item.node;

            return (
              <a key={id} href={link} target="_blank" className="project-card flex flex-col rounded-md shadow-md">
                <div className="project-img relative ">
                  <Img fluid={cover.childImageSharp.fluid} alt={title} fadeIn />
                  <h4 className="bg-gradient-to-t">{title}</h4>
                </div>
                <div className="project-content flex flex-col">
                  <div className="project-details">{details}</div>
                  <div className="project-stats flex items-center">
                    <div className="project-published">
                      {timeAgo.format(momnent(publishedAt, 'YYYY-MM-DDTHH:mm:ssZ').toDate())}
                    </div>
                    <div>ETA {duration}</div>
                  </div>
                  <div className="project-tech">
                    {tech.split('+').map((item, id) => (
                      <span key={id}>{item}</span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Projects;
