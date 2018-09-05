class ElementsController < ApplicationController

	def create
	end

	def update
		element = Element.find(params[:id])
		element.update(element_params)
	end

	def destroy
	end

	private

	def element_params
		params.require(:element).permit(:item, :content)
	end
end
