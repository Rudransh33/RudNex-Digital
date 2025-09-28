FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive
ENV PIP_ROOT_USER_ACTION=ignore

# Install system dependencies
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        ffmpeg \
        libsm6 \
        libxext6 \
        libxrender1 \
        libglib2.0-0 \
        libgl1 \
        libgomp1 \
    ; \
    rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy build context and install Python dependencies (supports root or backend context)
COPY . .
RUN pip install --no-cache-dir --upgrade pip --root-user-action=ignore && \
    if [ -f backend/requirements.txt ]; then \
        pip install --no-cache-dir -r backend/requirements.txt --root-user-action=ignore; \
    elif [ -f requirements.txt ]; then \
        pip install --no-cache-dir -r requirements.txt --root-user-action=ignore; \
    else \
        echo "requirements.txt not found" && exit 1; \
    fi

# (files already copied above)

# Create necessary directories
RUN mkdir -p uploads outputs content

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
