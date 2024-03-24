const LanguageList = ({ languages }) => {
  return (
    <ul>
      {Object.keys(languages).map((key) => (
        <li key={key}>{languages[key]}</li>
      ))}
    </ul>
  );
};
export default LanguageList;
