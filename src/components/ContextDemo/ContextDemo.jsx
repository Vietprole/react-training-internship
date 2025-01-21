import Section from "../Section/Section";
import Heading from "../Heading/Heading";

function ContextDemo() {
  return (
    <Section>
      <Heading/>
      <Section>
        <Heading/>
        <Heading/>
        <Heading/>
        <Section>
          <Heading/>
          <Heading/>
          <Heading/>
          <Section>
            <Heading/>
            <Heading/>
            <Heading/>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default ContextDemo;