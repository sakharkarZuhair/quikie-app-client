import "./styles.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const HeroCard = () => {
  const data = [
    {
      id: "google",
      name: "GOOGL",
      image: "/GOOGL.png",
      stock: 1515,
    },
    {
      id: "fb",
      name: "FB",
      image: "/FB.png",
      stock: 266,
    },
    {
      id: "amazon",
      name: "AMZN",
      image: "/AMZN.svg",
      stock: 3116,
    },
  ];
  const [card, setCard] = useState(data);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(card);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCard(items);
  };
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="heroCard">
          {(provided) => (
            <div
              className="heroCardBigContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {card.map(({ id, name, image, stock }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="herocardContainer"
                        key={id}
                      >
                        <div className="herocardFirst">
                          <h5 className="text-2xl">{name}</h5>
                          <div className="heroImage">
                            <img src={image} alt="" />
                          </div>
                        </div>
                        <h6 className="text-center text-5xl font-semibold mt-24">
                          {stock} USD
                        </h6>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default HeroCard;
