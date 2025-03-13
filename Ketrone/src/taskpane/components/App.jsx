import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@fluentui/react-components";
import Authentication from "./Authentication";
import Tabs from "./Tabs";
import ReviewContent from "./ReviewContent";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const [authenticated, setAuthenticated] = React.useState(false);
  const styles = useStyles();


  const handleLoginClick = () => {
    setAuthenticated(true);
  };

  const insertText = async (text) => {
    try {
      await Word.run(async (context) => {
        const body = context.document.body;
        body.insertText(text, Word.InsertLocation.end);
        await context.sync();
        console.log("Text inserted into the document");
      });
    } catch (error) {
      console.error("Error inserting text: ", error);
    }
  };

  const prepareDocumentForApi = async () => {
    try {
      await Word.run(async (context) => {
        const body = context.document.body;
        body.load('text');

        await context.sync();
        const documentText = body.text;
        console.log("Document content: ", documentText);
      });
    } catch (error) {
      console.error("Error preparing document: ", error);
    }
  };

  React.useEffect(() => {
    Office.onReady((info) => {
      if (info.host === Office.HostType.Word) {
        prepareDocumentForApi();
      }
    });
  }, []);


  return (
    <div className={styles.root}>
      {!authenticated &&
        <Authentication onLoginClick={handleLoginClick} />
      }
      {authenticated &&
        <div>
          <Tabs />
          <ReviewContent insertText={insertText} />
        </div>
      }
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
