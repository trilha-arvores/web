export default function ImageBg() {
  return (
    <div className="col-md-0 col-lg-6 px-0 d-none d-xl-block vh-100 position-relative">
        <div style={{backgroundImage: `url('flamboyant-laranja-esalq.jpg')`}} alt="Login" className="image_div rounded position-absolute translate-middle-y top-50 start-0"/>
        <div className="image-background-color"></div>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className="img-esalq p-4 d-sm-block">
                <img src="/logos/esalq.png" className="w-100 rounded me-2" alt="..."/>
                <div className="toast-header"/>
            </div>
        </div>
    </div>
  );
}