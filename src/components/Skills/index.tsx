import React from 'react';
import _ from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';

import { SectionTitle } from 'helpers/definitions';

import * as Styled from './styles';

interface Skill {
  node: {
    id: string;
    frontmatter: {
      title: string;
      quandrant: string;
      percentage: number;
    };
  };
}

const Skills: React.FC = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "skills section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(filter: { frontmatter: { category: { eq: "skills" } } }, sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            frontmatter {
              title
              quandrant
              percentage
            }
          }
        }
      }
    }
  `);

  const sectionTitle: SectionTitle = markdownRemark.frontmatter;
  const skills: Skill[] = allMarkdownRemark.edges;
  const { backend, frontend, cloud, misc } = _.groupBy(skills, 'node.frontmatter.quandrant');

  

  return (
    <Container section>
      <TitleSection title={sectionTitle.title} subtitle={sectionTitle.subtitle} center />
      <Styled.SkillMatrix>
        <Styled.SkillQuadrant>
        {backend.map((item) => {
          const {
            id,
            frontmatter: { title, percentage }
          } = item.node;

          return (
            <Styled.SkillItem key={id} s={percentage}>
              {title}
            </Styled.SkillItem>
          );
        })}
        </Styled.SkillQuadrant>
        <Styled.SkillQuadrant>
        {frontend.map((item) => {
          const {
            id,
            frontmatter: { title, percentage }
          } = item.node;

          return (
            <Styled.SkillItem key={id} s={percentage}>
              {title}
            </Styled.SkillItem>
          );
        })}
        </Styled.SkillQuadrant>
        <Styled.SkillQuadrant>
        {cloud.map((item) => {
          const {
            id,
            frontmatter: { title, percentage }
          } = item.node;

          return (
            <Styled.SkillItem key={id} s={percentage}>
              {title}
            </Styled.SkillItem>
          );
        })}
        </Styled.SkillQuadrant>
        <Styled.SkillQuadrant>
        {misc.map((item) => {
          const {
            id,
            frontmatter: { title, percentage }
          } = item.node;

          return (
            <Styled.SkillItem key={id} s={percentage}>
              {title}
            </Styled.SkillItem>
          );
        })}
        </Styled.SkillQuadrant>
      </Styled.SkillMatrix>
    </Container>
  );
};

export default Skills;
