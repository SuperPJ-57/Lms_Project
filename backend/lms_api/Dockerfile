FROM python:3.12-slim

# Set environment variables properly (without spaces)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY ./lms .

# Expose port
EXPOSE 5005

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:5005"]