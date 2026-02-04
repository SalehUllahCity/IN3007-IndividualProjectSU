import { useState } from 'react';

export default function TaskForm({isOpen, onClose}) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [estimatedDuration, setEstimatedDuration] = useState(30);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Task created: ', { title, description,priority, estimatedDuration });
        onClose(); // close the form

            // Reset form fields
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setEstimatedDuration(30);
    }

    // do not open the form if isOpen is false
    if (!isOpen) return null;
    
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4"
            style={{zIndex:50}}> {/* Ensure this is high enough to ensure that no other elements are above it */}
            onClick={onClose} 
        <div
        className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} 
        > {/* Prevent closing when clicking inside the modal, also seems like I can't have comments inside the containers */}
        <div className ="flex items-center justify-between p-6 border-b border-gray-200">
            
                      <h2 className="text-xl font-bold text-primary">Add New Task</h2>
                      <button onClick={onClose} className="text-muted hover:text-primary transition cursor-pointer">X
        
                      </button>
        </div>
            {/* To fix the description field since it is not formatted properly, probably due to padding}
            <div>
                
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-primary-soft focus:border-primary focus:outline-none bg-background" placeholder="Description"></textarea>
            </div>
                */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4"> 
                 <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary-soft focus:border-primary focus:outline-none bg-background"
              placeholder="What needs to be done?"
            />
          </div>
          {/* Description */}
          <div> 
            <label className="block text-sm font-medium text-primary mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-primary-soft focus:border-primary focus:outline-none bg-background"
              placeholder="Additional details..."
              rows={3}
            />
          </div>
            <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Priority
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['low', 'medium', 'high', 'urgent'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    px-3 py-2 rounded-lg font-medium transition capitalize cursor-pointer
                    ${priority === p ? 'bg-green-300 text-black': 'bg-green-100 text-secondary hover:bg-primary-soft'
                    }`}
                >{p}
                </button> ))}
            </div>
          </div>

          {/* Estimated Duration */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Estimated Duration: {estimatedDuration} minutes
            </label>
            <input
              type="range"
              min="15"
              max="240"
              step="15"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>15 minutes</span>
              <span>4 hours</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-300 hover:bg-primary-hover text-black py-3 rounded-lg font-medium transition cursor-pointer">
            Create Task
          </button>
          
            </form>
                
      
        </div>
        </div>

    );
}