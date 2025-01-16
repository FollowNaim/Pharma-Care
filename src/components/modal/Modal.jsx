import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Modal({ isModalOpen, setIsModalOpen, medicine }) {
  const {
    name,
    image,
    dosage,
    category,
    price,
    discount,
    brand,
    description,
    manufacturer,
  } = medicine || {};
  return (
    <div className="">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <img
              src={image}
              className="h-40 object-cover object-center"
              alt=""
            />
            <DialogTitle className="py-3">{name}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-10">
            <p className="flex items-center gap-2">
              Price: <span className="text-muted-foreground">{price}</span>
            </p>
            <p className="flex items-center gap-2">
              Discount:{" "}
              <span className="text-muted-foreground">{discount || 0}%</span>
            </p>
            <p className="flex items-center gap-2">
              Category:{" "}
              <span className="text-muted-foreground">{category}</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2">
              Manufacturer:
              <span className="text-muted-foreground">{brand}</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
