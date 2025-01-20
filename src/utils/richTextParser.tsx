type RichTextParserFunction = (keyTranslation: string) => React.ReactNode;

const richTextParser: RichTextParserFunction = (keyTranslation) => {
  const regex = /<strong>(.*?)<\/strong>|<a href='(.*?)'>(.*?)<\/a>|<\/br>/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  keyTranslation.replace(regex, (match, boldText, aHref, aText, offset) => {
    if (lastIndex < offset) {
      parts.push(keyTranslation.substring(lastIndex, offset));
    }

    // <strong></strong>
    if (boldText) {
      parts.push(
        <span key={offset} className='font-bold'>
          {boldText}
        </span>
      );
    }

    // <a href=''></a>
    if (aHref && aText) {
      parts.push(
        <a key={offset} href={aHref}>
          {aText}
        </a>
      );
    }

    // </br>
    if (match === '</br>') {
      parts.push(<br key={offset} />);
    }

    lastIndex = offset + match.length;

    return match;
  });

  if (lastIndex < keyTranslation.length) {
    parts.push(keyTranslation.substring(lastIndex));
  }

  return <>{parts}</>;
};

export default richTextParser;
