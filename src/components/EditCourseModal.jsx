import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";

const EditCourseModal = ({ course, onClose, onSave }) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    modalInstance.current = new Modal(modalRef.current);
    modalInstance.current.show();

    modalRef.current.addEventListener("hidden.bs.modal", () => {
      onClose();
    });

    return () => {
      modalInstance.current.dispose();
    };
  }, []);

  const handleSave = () => {
    onSave({ ...course, title, meets });
    modalInstance.current.hide();
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Editar Curso</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => modalInstance.current.hide()}
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Horario</label>
              <input
                className="form-control"
                value={meets}
                onChange={(e) => setMeets(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => modalInstance.current.hide()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;