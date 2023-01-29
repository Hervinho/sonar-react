import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button} from 'react-bootstrap';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)} style={{ backgroundColor: '#0054a6'}}>
        Cliquez Moi
      </Button>

      <Modal show={isOpen} backdrop={'static'}>
        <Modal.Body>
          Bonjour Laval!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Fermez
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
